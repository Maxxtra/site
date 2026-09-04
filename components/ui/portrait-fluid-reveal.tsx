'use client';

import { useEffect, useRef, useState } from 'react';

type PortraitFluidRevealProps = {
  /** Base portrait (texture A). Always rendered as a real <img> for SSR/alt/fallback. */
  src: string;
  /** Cybernetic portrait (texture B). Must share A's canvas size, crop and facial alignment. */
  revealSrc: string;
  alt: string;
  className?: string;
};

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Fluid mask: an animated fbm field displaces the pointer's radial boundary, so
// the edge between the two portraits is soft, noisy and organic rather than a
// circle, wipe or crossfade.
const FRAG = `
precision highp float;

uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform vec2  uCanvas;    // canvas size in px
uniform vec2  uImage;     // source image size in px
uniform vec2  uMouse;     // smoothed pointer, uv space
uniform float uTime;
uniform float uHover;     // 0..1 eased presence
uniform float uSpeed;     // pointer velocity, smoothed
uniform vec3  uAccent;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * valueNoise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return v;
}

// object-fit: cover, done in-shader so the two textures stay pixel-aligned.
vec2 coverUv(vec2 uv) {
  float canvasAspect = uCanvas.x / uCanvas.y;
  float imageAspect = uImage.x / uImage.y;
  vec2 scale = vec2(1.0);
  if (canvasAspect > imageAspect) {
    scale.y = imageAspect / canvasAspect;
  } else {
    scale.x = canvasAspect / imageAspect;
  }
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 uv = vUv;
  vec2 tUv = coverUv(uv);

  float aspect = uCanvas.x / uCanvas.y;
  vec2 d = uv - uMouse;
  d.x *= aspect;
  float dist = length(d);

  float n1 = fbm(uv * 3.4 + uTime * 0.20);
  float n2 = fbm(uv * 7.5 - uTime * 0.15);

  // The wave sweeps out from the pointer and consumes the WHOLE portrait.
  // Corner distance in this aspect-corrected space is ~0.64 for a 4:5 frame,
  // so the radius has to clear that with margin even when the pointer enters
  // at an edge — otherwise the reveal reads as a localised patch.
  float radius = uHover * (1.18 + uSpeed * 0.18);

  // Edge turbulence keeps the travelling boundary organic, then fades out as
  // the sweep completes so full coverage is genuinely full: no residual holes.
  float turbulence = 1.0 - smoothstep(0.55, 1.0, uHover);
  float boundary = dist - radius + ((n1 - 0.5) * 0.22 + (n2 - 0.5) * 0.09) * turbulence;

  float mask = 1.0 - smoothstep(-0.05, 0.07, boundary);
  mask = clamp(mask, 0.0, 1.0);

  // Slight refraction of texture B near the boundary sells the "liquid" feel.
  vec2 disp = vec2(n1 - 0.5, n2 - 0.5) * 0.030 * mask;

  vec4 a = texture2D(uTexA, tUv);
  vec4 b = texture2D(uTexB, tUv + disp);
  vec3 col = mix(a.rgb, b.rgb, mask);

  // Accent only on the travelling edge. It rides the wave and disappears once
  // coverage completes (mask == 1 everywhere), so the settled state is the
  // cyborg portrait itself rather than an orange outline over the photo.
  float rim = smoothstep(0.0, 0.45, mask) * (1.0 - smoothstep(0.45, 0.95, mask));
  col += uAccent * rim * 0.32 * uHover;

  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, source);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function makeTexture(gl: WebGLRenderingContext, img: HTMLImageElement) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  return tex;
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

export function PortraitFluidReveal({ src, revealSrc, alt, className }: PortraitFluidRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gl = (canvas.getContext('webgl', { antialias: false, alpha: false }) ??
      canvas.getContext('experimental-webgl', { antialias: false, alpha: false })) as WebGLRenderingContext | null;
    if (!gl) return; // no WebGL -> the plain <img> underneath stays visible

    let disposed = false;
    let raf = 0;
    let cleanup: (() => void) | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let texA: WebGLTexture | null = null;
    let texB: WebGLTexture | null = null;

    // pointer state, in uv space
    const target = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };
    let hoverTarget = 0;
    let hover = 0;
    let speed = 0;
    let onscreen = true;
    let pageVisible = true;

    const start = performance.now();

    (async () => {
      let imgA: HTMLImageElement, imgB: HTMLImageElement;
      try {
        [imgA, imgB] = await Promise.all([loadImage(src), loadImage(revealSrc)]);
      } catch {
        return; // asset missing -> silent fallback to the <img>
      }
      if (disposed) return;

      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return;
      program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(program, 'aPos');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      texA = makeTexture(gl, imgA);
      texB = makeTexture(gl, imgB);

      const u = {
        texA: gl.getUniformLocation(program, 'uTexA'),
        texB: gl.getUniformLocation(program, 'uTexB'),
        canvas: gl.getUniformLocation(program, 'uCanvas'),
        image: gl.getUniformLocation(program, 'uImage'),
        mouse: gl.getUniformLocation(program, 'uMouse'),
        time: gl.getUniformLocation(program, 'uTime'),
        hover: gl.getUniformLocation(program, 'uHover'),
        speed: gl.getUniformLocation(program, 'uSpeed'),
        accent: gl.getUniformLocation(program, 'uAccent'),
      };

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.uniform1i(u.texA, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texB);
      gl.uniform1i(u.texB, 1);
      gl.uniform2f(u.image, imgA.naturalWidth, imgA.naturalHeight);
      gl.uniform3f(u.accent, 0.99, 0.32, 0.0); // #fd5200

      const resize = () => {
        // Cap DPR: the visual is soft-edged, so 2x is plenty and keeps fill rate low.
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const r = wrap.getBoundingClientRect();
        const w = Math.max(1, Math.round(r.width * dpr));
        const h = Math.max(1, Math.round(r.height * dpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(u.canvas, canvas.width, canvas.height);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      setReady(true);

      let lastX = 0.5;
      let lastY = 0.5;
      let idleFrames = 0;

      const frame = () => {
        raf = 0;
        if (disposed) return;

        smooth.x += (target.x - smooth.x) * 0.12;
        smooth.y += (target.y - smooth.y) * 0.12;
        hover += (hoverTarget - hover) * 0.09;

        const dx = smooth.x - lastX;
        const dy = smooth.y - lastY;
        const inst = Math.min(1, Math.hypot(dx, dy) * 14);
        speed += (inst - speed) * 0.12;
        lastX = smooth.x;
        lastY = smooth.y;

        gl.uniform2f(u.mouse, smooth.x, smooth.y);
        gl.uniform1f(u.time, (performance.now() - start) / 1000);
        gl.uniform1f(u.hover, hover);
        gl.uniform1f(u.speed, speed);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        // Stop the loop once fully settled; restart on the next interaction.
        const settled =
          hover < 0.002 &&
          hoverTarget === 0 &&
          Math.abs(target.x - smooth.x) < 0.001 &&
          Math.abs(target.y - smooth.y) < 0.001;
        idleFrames = settled ? idleFrames + 1 : 0;
        if (idleFrames > 6) return;

        raf = requestAnimationFrame(frame);
      };

      const kick = () => {
        if (!raf && !disposed && onscreen && pageVisible) raf = requestAnimationFrame(frame);
      };

      const toUv = (e: PointerEvent) => {
        const r = wrap.getBoundingClientRect();
        target.x = (e.clientX - r.left) / r.width;
        target.y = 1 - (e.clientY - r.top) / r.height; // GL origin bottom-left
      };

      const onEnter = (e: PointerEvent) => {
        toUv(e);
        smooth.x = target.x;
        smooth.y = target.y;
        hoverTarget = 1;
        kick();
      };
      const onMove = (e: PointerEvent) => {
        toUv(e);
        hoverTarget = 1;
        kick();
      };
      const onLeave = () => {
        hoverTarget = 0;
        kick();
      };

      // Pointer events cover mouse, pen and touch. On touch this becomes
      // press-and-drag to reveal, which needs no hover emulation.
      wrap.addEventListener('pointerenter', onEnter);
      wrap.addEventListener('pointermove', onMove);
      wrap.addEventListener('pointerleave', onLeave);
      wrap.addEventListener('pointercancel', onLeave);
      wrap.addEventListener('pointerdown', onEnter);
      wrap.addEventListener('pointerup', onLeave);

      const io = new IntersectionObserver(
        ([entry]) => {
          onscreen = entry.isIntersecting;
          if (!onscreen && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          } else if (onscreen) {
            kick();
          }
        },
        { threshold: 0 },
      );
      io.observe(wrap);

      const onVis = () => {
        pageVisible = document.visibilityState === 'visible';
        if (!pageVisible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        } else if (pageVisible) {
          kick();
        }
      };
      document.addEventListener('visibilitychange', onVis);

      kick(); // initial paint

      cleanup = () => {
        wrap.removeEventListener('pointerenter', onEnter);
        wrap.removeEventListener('pointermove', onMove);
        wrap.removeEventListener('pointerleave', onLeave);
        wrap.removeEventListener('pointercancel', onLeave);
        wrap.removeEventListener('pointerdown', onEnter);
        wrap.removeEventListener('pointerup', onLeave);
        document.removeEventListener('visibilitychange', onVis);
        io.disconnect();
        ro.disconnect();
      };
    })();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      cleanup?.();
      if (texA) gl.deleteTexture(texA);
      if (texB) gl.deleteTexture(texB);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [src, revealSrc]);

  return (
    <div ref={wrapRef} className={`portrait-gl ${className ?? ''}`}>
      {/* Real image: carries the alt text, renders server-side, and remains the
          visible layer whenever WebGL is unavailable, reduced-motion is on, or
          a texture fails to load. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="portrait-gl-img" decoding="async" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="portrait-gl-canvas"
        data-active={ready ? 'true' : 'false'}
      />
    </div>
  );
}
