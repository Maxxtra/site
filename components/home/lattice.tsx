'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero lattice: a fine-line torus — the interconnect topology of a distributed
 * training cluster — orbiting the portrait. Three accent rings circulate it the
 * way a message travels a ring all-reduce.
 *
 * Depth is real, not faked with z-index: the fragment shader reads the
 * portrait's alpha matte, discards the far half of the torus where the subject
 * covers it, and flips the near half from ink to paper where it crosses the
 * body, so the line stays legible over a black shirt.
 *
 * Progressive enhancement. The portrait, name and modules are plain DOM and
 * never depend on this canvas. No WebGL → the canvas simply stays empty.
 * prefers-reduced-motion → one static frame, no loop, no pointer tracking.
 */

const NU = 160; // samples along the ring
const NV = 28; // samples around the tube
const RING_STEP = 4; // every n-th u gets a tube circle

const VERT = `
attribute vec2 aUV;      // (u, v) in radians
attribute float aKind;   // 0 = longitudinal line, 1 = tube circle
uniform vec2 uCanvas;    // css px
uniform vec4 uRect;      // portrait box in canvas css px: x, y, w, h
uniform vec2 uCenter;    // lattice centre, in box widths from box top-left
uniform float uRadius;   // major radius, box widths
uniform float uTube;     // minor / major
uniform float uTilt;
uniform float uRoll;
uniform float uSpin;
uniform float uTime;
uniform vec2 uPointer;   // canvas css px, (-1e4) when absent
varying float vZ;
varying float vAccent;
varying float vU;

vec3 place(float u, float v, float r) {
  vec3 p = vec3((1.0 + r * cos(v)) * cos(u), (1.0 + r * cos(v)) * sin(u), r * sin(v));
  float ct = cos(uTilt), st = sin(uTilt);
  p = vec3(p.x, p.y * ct + p.z * st, -p.y * st + p.z * ct);   // top of ring recedes
  float cr = cos(uRoll), sr = sin(uRoll);
  return vec3(p.x * cr - p.y * sr, p.x * sr + p.y * cr, p.z);
}

vec2 project(vec3 p) {
  float persp = 1.0 / (1.0 - p.z * 0.22);
  vec2 box = uCenter + vec2(p.x, -p.y) * uRadius * persp;
  return uRect.xy + box * uRect.z;
}

void main() {
  float u = aUV.x + uSpin;
  float v = aUV.y;
  // A slow standing wave keeps the tube from reading as CAD geometry.
  float r = uTube * (1.0 + 0.14 * sin(2.0 * aUV.x + 0.7 + uTime * 0.11) + 0.05 * sin(5.0 * aUV.x - uTime * 0.07));

  // Circulating messages: three phases, a third of a turn apart.
  float accent = 0.0;
  for (int i = 0; i < 3; i++) {
    float phase = float(i) * 2.0943951 + uTime * 0.23;
    float d = atan(sin(aUV.x - phase), cos(aUV.x - phase));
    accent = max(accent, exp(-d * d / 0.0022));
  }
  r *= 1.0 + 0.16 * accent;

  // The field swells toward the pointer.
  vec2 rough = project(place(u, v, r));
  float pd = distance(rough, uPointer) / uRect.z;
  r *= 1.0 + 0.55 * exp(-pd * pd / 0.018);

  vec3 p = place(u, v, r);
  vec2 px = project(p);
  vZ = p.z;
  vAccent = accent * aKind;
  vU = mod(aUV.x, 6.2831853) / 6.2831853;
  gl_Position = vec4(px.x / uCanvas.x * 2.0 - 1.0, 1.0 - px.y / uCanvas.y * 2.0, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform sampler2D uMatte;
uniform float uHasMatte;
// Own names: sharing a uniform with the vertex shader at a different default
// precision (highp there, mediump here) is a link error.
uniform vec2 uCanvasF;
uniform vec4 uRectF;
uniform float uDpr;
uniform float uIntro;    // 0 → 1, the ring draws itself once
uniform float uNight;    // 0 = paper ground, 1 = ink ground
uniform float uFade;
uniform vec3 uInk;
uniform vec3 uPaper;
uniform vec3 uAccent;
varying float vZ;
varying float vAccent;
varying float vU;

void main() {
  if (vU > uIntro) discard;

  vec2 css = vec2(gl_FragCoord.x, uCanvasF.y * uDpr - gl_FragCoord.y) / uDpr;
  vec2 uv = (css - uRectF.xy) / uRectF.zw;
  float inside = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
  float matte = texture2D(uMatte, clamp(uv, 0.0, 1.0)).a * inside * uHasMatte;

  float front = smoothstep(-0.02, 0.02, vZ);
  float depth = smoothstep(-1.1, 1.1, vZ);

  // Far half hides behind the subject; near half flips to paper over the body.
  float visible = mix(1.0 - matte, 1.0, front);
  vec3 line = mix(uInk, uPaper, max(matte * front, uNight));
  vec3 color = mix(line, uAccent, vAccent);

  float alpha = mix(0.16, 0.62, depth);
  alpha = mix(alpha, 0.95, vAccent) * visible * uFade;
  alpha *= smoothstep(uIntro, uIntro - 0.06, vU);
  gl_FragColor = vec4(color * alpha, alpha);
}
`;

function buildGeometry() {
  const verts: number[] = [];
  const push = (u: number, v: number, kind: number) => verts.push(u, v, kind);
  const TAU = Math.PI * 2;
  // Longitudinal lines: constant v, running around the ring.
  for (let j = 0; j < NV; j += 4) {
    const v = (j / NV) * TAU;
    for (let i = 0; i < NU; i++) {
      push((i / NU) * TAU, v, 0);
      push(((i + 1) / NU) * TAU, v, 0);
    }
  }
  // Tube circles: constant u.
  for (let i = 0; i < NU; i += RING_STEP) {
    const u = (i / NU) * TAU;
    for (let j = 0; j < NV; j++) {
      push(u, (j / NV) * TAU, 1);
      push(u, ((j + 1) / NV) * TAU, 1);
    }
  }
  return new Float32Array(verts);
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== 'production') console.warn('[lattice] shader compile failed:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

type Props = {
  /** Selector of the <img> the lattice orbits; its box drives all geometry. */
  portraitSelector: string;
  /** Transparent cutout; its alpha channel is the occlusion matte. */
  matteSrc: string;
  /** Element carrying --hp (hero scroll progress 0..1). */
  progressSelector: string;
  className?: string;
};

export function Lattice({ portraitSelector, matteSrc, progressSelector, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const portrait = document.querySelector<HTMLElement>(portraitSelector);
    const progressEl = document.querySelector<HTMLElement>(progressSelector);
    if (!canvas || !portrait) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (process.env.NODE_ENV !== 'production') console.warn('[lattice] program link failed:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const geometry = buildGeometry();
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry, gl.STATIC_DRAW);
    const aUV = gl.getAttribLocation(program, 'aUV');
    const aKind = gl.getAttribLocation(program, 'aKind');
    gl.enableVertexAttribArray(aUV);
    gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray(aKind);
    gl.vertexAttribPointer(aKind, 1, gl.FLOAT, false, 12, 8);

    const U = (name: string) => gl.getUniformLocation(program, name);
    const loc = {
      canvas: U('uCanvas'), rect: U('uRect'), canvasF: U('uCanvasF'), rectF: U('uRectF'), center: U('uCenter'), radius: U('uRadius'), tube: U('uTube'),
      tilt: U('uTilt'), roll: U('uRoll'), spin: U('uSpin'), time: U('uTime'), pointer: U('uPointer'),
      hasMatte: U('uHasMatte'), dpr: U('uDpr'), intro: U('uIntro'), night: U('uNight'), fade: U('uFade'),
      ink: U('uInk'), paper: U('uPaper'), accent: U('uAccent'),
    };

    gl.uniform3fv(loc.ink, hex('#0e0e0c'));
    gl.uniform3fv(loc.paper, hex('#f2f0ea'));
    gl.uniform3fv(loc.accent, hex('#fd5200'));
    gl.uniform1f(loc.hasMatte, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 767px)');

    // Matte texture: a 1x1 stand-in until the cutout decodes.
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
    const matte = new Image();
    matte.decoding = 'async';
    matte.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, matte);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.uniform1f(loc.hasMatte, 1);
      if (reduced) draw(performance.now());
    };
    matte.src = matteSrc;

    let dpr = 1;
    let cssW = 0;
    let cssH = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = canvas.clientWidth;
      cssH = canvas.clientHeight;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (reduced) draw(performance.now());
    };

    const pointer = { x: -1e4, y: -1e4, nx: 0, ny: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.tx = (pointer.x / r.width) * 2 - 1;
      pointer.ty = (pointer.y / r.height) * 2 - 1;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1e4;
      pointer.tx = pointer.ty = 0;
    };

    const start = performance.now();
    let raf = 0;
    let running = false;

    function draw(now: number) {
      const t = reduced ? 40 : (now - start) / 1000;
      const hp = Number(progressEl?.style.getPropertyValue('--hp') || 0);
      const ease = hp * hp * (3 - 2 * hp);

      const cr = canvas!.getBoundingClientRect();
      const pr = portrait!.getBoundingClientRect();
      pointer.nx += (pointer.tx - pointer.nx) * 0.05;
      pointer.ny += (pointer.ty - pointer.ny) * 0.05;

      const small = compact.matches;
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      const box = [pr.left - cr.left, pr.top - cr.top, pr.width, pr.height] as const;
      gl!.uniform2f(loc.canvas, cssW, cssH);
      gl!.uniform2f(loc.canvasF, cssW, cssH);
      gl!.uniform4f(loc.rect, ...box);
      gl!.uniform4f(loc.rectF, ...box);
      gl!.uniform2f(loc.center, 0.5, small ? 0.6 : 0.57);
      // Scrolling out: the ring turns to face the viewer and opens like an
      // aperture, so the page passes through it into the dark section.
      gl!.uniform1f(loc.radius, (small ? 0.5 : 0.545) * (1 + ease * 2.1));
      gl!.uniform1f(loc.tube, 0.13 - ease * 0.04);
      gl!.uniform1f(loc.tilt, (0.92 + pointer.ny * 0.09) * (1 - ease * 0.8));
      gl!.uniform1f(loc.roll, -0.3 + pointer.nx * 0.07 + ease * 0.5);
      gl!.uniform1f(loc.spin, t * 0.035);
      gl!.uniform1f(loc.time, t);
      gl!.uniform2f(loc.pointer, pointer.x, pointer.y);
      gl!.uniform1f(loc.dpr, dpr);
      gl!.uniform1f(loc.intro, reduced ? 1.1 : Math.min(1.1, ((now - start) / 1500) ** 0.8 * 1.1));
      gl!.uniform1f(loc.night, Math.min(1, Math.max(0, (hp - 0.12) / 0.3)));
      gl!.uniform1f(loc.fade, 1 - Math.min(1, Math.max(0, (hp - 0.8) / 0.2)));
      gl!.drawArrays(gl!.LINES, 0, geometry.length / 3);
      canvas!.dataset.active = 'true';
    }

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const setRunning = (next: boolean) => {
      if (reduced || next === running) return;
      running = next;
      if (next) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    // Only burn frames while the hero is on screen and the tab is visible.
    let onScreen = true;
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      setRunning(onScreen && !document.hidden);
    });
    io.observe(canvas);
    const onVisibility = () => setRunning(onScreen && !document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    if (reduced) {
      draw(performance.now());
    } else {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
    }

    const onLost = (e: Event) => {
      e.preventDefault();
      setRunning(false);
      canvas.dataset.active = 'false';
    };
    canvas.addEventListener('webglcontextlost', onLost);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
    };
  }, [portraitSelector, matteSrc, progressSelector]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
