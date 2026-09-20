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
 * Interaction. The ring is not an object to be dragged around the page. It
 * floats around the head and answers the cursor in full 2D: toward the upper
 * right when the cursor is there, down and left when it is there, diagonals
 * included. It travels on a lightly under-damped spring, tips its plane toward
 * the cursor (tilt and roll), and swirls about its own axis as the cursor
 * circles the head. Its reach is a fraction of its own radius, so it always
 * frames the head; beyond the field around the head, over the nav, or on
 * touch, it eases back to rest. The bias is an *offset* on the authored centre
 * and fades out with the scroll exit, so the choreography is never overwritten.
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

  // Under the cursor the tube only firms up a little; the response to the
  // cursor is the ring's position and lean, not a zoom.
  vec2 rough = project(place(u, v, r));
  float pd = distance(rough, uPointer) / uRect.z;
  r *= 1.0 + 0.08 * exp(-pd * pd / 0.012);

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

// Local cursor-follow. All distances in portrait-box widths (~740px at 1440).
const HEAD_X = 0.5; // centre of the head inside the image box
const HEAD_Y = 0.4;
const FIELD_INNER = 0.5; // full influence within this distance of the head…
const FIELD_OUTER = 1.0; // …none beyond this, with a smooth falloff between
const REACH_X = 0.17; // furthest the ring's centre ever travels: ≈125px across,
const REACH_UP = 0.15; // ≈110px up, ≈70px down (less, so the near arc stays in
const REACH_DOWN = 0.095; // frame), against a ring radius of ≈315px
const SOFTNESS = 0.34; // cursor distance at which the ring is ~3/4 of the way out
const FOLLOW_K = 44; // spring: damping ratio 0.68, one soft overshoot, then still
const FOLLOW_C = 2 * Math.sqrt(FOLLOW_K) * 0.68;
const TILT_GAIN = 0.24; // rad at full vertical reach: the plane tips toward the cursor
const ROLL_GAIN = 0.2; // rad at full horizontal reach
const SWIRL_GAIN = 9; // spin about its own axis, from the cursor circling the head

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

    const stage = canvas.parentElement as HTMLElement;
    // Cursor in canvas px, and whether it is over the hero itself (not the nav,
    // and not the statement once that has risen over the stage).
    const pointer = { x: -1e4, y: -1e4, over: false };
    // Spring state: (ox, oy) is the bias added to the authored centre.
    const follow = { ox: 0, oy: 0, vx: 0, vy: 0, swirl: 0 };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.over = e.target instanceof Node && stage.contains(e.target);
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1e4;
      pointer.over = false;
    };

    const start = performance.now();
    let last = start;
    let raf = 0;
    let running = false;

    function draw(now: number) {
      const t = reduced ? 40 : (now - start) / 1000;
      const hp = Number(progressEl?.style.getPropertyValue('--hp') || 0);
      // The hero stays pinned for the whole time the statement covers it, so
      // the ring's own exit only uses the first part of that range.
      const lp = Math.min(1, hp / 0.5);
      const ease = lp * lp * (3 - 2 * lp);

      const cr = canvas!.getBoundingClientRect();
      const pr = portrait!.getBoundingClientRect();

      // --- cursor → local goal → spring → bias ------------------------------
      const dt = Math.min(1 / 30, Math.max(0, (now - last) / 1000));
      last = now;
      let goalX = 0;
      let goalY = 0;
      if (pointer.over && pr.width > 0) {
        const dx = (pointer.x - (pr.left - cr.left)) / pr.width - HEAD_X;
        const dy = (pointer.y - (pr.top - cr.top)) / pr.width - HEAD_Y;
        const f = Math.min(1, Math.max(0, (Math.hypot(dx, dy) - FIELD_INNER) / (FIELD_OUTER - FIELD_INNER)));
        const weight = 1 - f * f * (3 - 2 * f);
        goalX = REACH_X * Math.tanh(dx / SOFTNESS) * weight;
        goalY = (dy < 0 ? REACH_UP : REACH_DOWN) * Math.tanh(dy / SOFTNESS) * weight;
      }
      for (let i = 0; i < 2; i++) {
        const h = dt / 2;
        follow.vx += (FOLLOW_K * (goalX - follow.ox) - FOLLOW_C * follow.vx) * h;
        follow.vy += (FOLLOW_K * (goalY - follow.oy) - FOLLOW_C * follow.vy) * h;
        follow.ox += follow.vx * h;
        follow.oy += follow.vy * h;
      }
      // Swirl: the ring's angular momentum about the head turns it on its own
      // axis, so circling the head with the cursor spins the lattice with it.
      // It is an accumulated angle on a symmetric ring: it never has to unwind.
      follow.swirl += (follow.ox * follow.vy - follow.oy * follow.vx) * SWIRL_GAIN * dt;
      // Floating, not parked: a breath of drift at rest (static under
      // reduced motion, where t is fixed).
      const drift = reduced ? 0 : 0.006;
      // The bias belongs to the hero at rest; the exit is authored alone.
      const bx = (follow.ox + drift * Math.sin(t * 0.55)) * (1 - ease);
      const by = (follow.oy + drift * Math.cos(t * 0.4)) * (1 - ease);
      // -1..1: how far toward its reach the ring currently is, per axis.
      const nx = bx / REACH_X;
      const ny = by / REACH_UP;

      const small = compact.matches;
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      const box = [pr.left - cr.left, pr.top - cr.top, pr.width, pr.height] as const;
      gl!.uniform2f(loc.canvas, cssW, cssH);
      gl!.uniform2f(loc.canvasF, cssW, cssH);
      gl!.uniform4f(loc.rect, ...box);
      gl!.uniform4f(loc.rectF, ...box);
      // Anchored to the person, not the frame: the far arc passes behind the
      // head at temple height and the near arc crosses at the collar line, so
      // the ring sits on the shoulders like a yoke instead of circling the chest.
      gl!.uniform2f(loc.center, 0.5 + bx, (small ? 0.6 : 0.53) + by);
      // Scrolling out: the ring turns to face the viewer and opens like an
      // aperture, so the page passes through it into the dark section.
      gl!.uniform1f(loc.radius, (small ? 0.5 : 0.435) * (1 + ease * 2.6));
      gl!.uniform1f(loc.tube, 0.15 - ease * 0.05);
      // The plane tips toward the cursor, and leans a little further into its
      // own motion, so a change of direction reads as weight, not as a slide.
      const leanTilt = Math.max(-0.1, Math.min(0.1, -follow.vy * 0.5));
      const leanRoll = Math.max(-0.1, Math.min(0.1, follow.vx * 0.5));
      gl!.uniform1f(loc.tilt, (1.0 + ny * TILT_GAIN + leanTilt * (1 - ease)) * (1 - ease * 0.8));
      gl!.uniform1f(loc.roll, -0.26 + nx * ROLL_GAIN + leanRoll * (1 - ease) + ease * 0.5);
      gl!.uniform1f(loc.spin, t * 0.035 + follow.swirl);
      gl!.uniform1f(loc.time, t);
      gl!.uniform2f(loc.pointer, pointer.over ? pointer.x : -1e4, pointer.over ? pointer.y : -1e4);
      gl!.uniform1f(loc.dpr, dpr);
      gl!.uniform1f(loc.intro, reduced ? 1.1 : Math.min(1.1, ((now - start) / 1500) ** 0.8 * 1.1));
      gl!.uniform1f(loc.night, Math.min(1, Math.max(0, (hp - 0.02) / 0.14)));
      gl!.uniform1f(loc.fade, 1 - Math.min(1, Math.max(0, (lp - 0.7) / 0.3)));
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
