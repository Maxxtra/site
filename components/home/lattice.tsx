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
 * Interaction. The ring is an object, not a hover effect: with a mouse or pen
 * it can be grabbed and carried around the portrait. The pointer sets a target,
 * a damped spring follows it, and the result is an *offset* added to the
 * authored centre, so the scroll choreography is never overwritten. Depth
 * masking is untouched, so dragging the ring over the head shows the far arc
 * disappearing behind it. Touch is deliberately passive: vertical scrolling on
 * a phone is never contested.
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
uniform vec2 uGrab;      // canvas css px, where the ring is being held
uniform float uGrabAmt;  // pull toward the hand: small at rest, more while the ring lags
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

  // Hover is only a breath: the tube firms up slightly under the pointer.
  vec2 rough = project(place(u, v, r));
  float pd = distance(rough, uPointer) / uRect.z;
  r *= 1.0 + 0.09 * exp(-pd * pd / 0.012);

  vec3 p = place(u, v, r);
  vec2 px = project(p);

  // Held: the mesh near the hand is drawn toward it. Because the ring trails
  // the pointer on a spring, this reads as the grabbed section stretching
  // ahead of the rest. Screen-space only, so depth (vZ) and the matte agree.
  vec2 toGrab = uGrab - px;
  float gd = length(toGrab) / uRect.z;
  px += toGrab * uGrabAmt * exp(-gd * gd / 0.016);
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
uniform float uHover;    // 0..1, the ring is under the pointer or held
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

  float alpha = mix(0.16, 0.62, depth) * (1.0 + 0.22 * uHover);
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

const MATTE_N = 96;
const HIT_SAMPLES = 64;

// Direct manipulation, in portrait-box widths (the box is ~756px at 1440x900).
// Soft limits: the offset approaches these asymptotically and never passes
// them, so the ring can be carried from hair level to the upper chest and out
// over either shoulder, but never out of the composition.
const LIMIT_X = 0.42;
const LIMIT_UP = 0.36;
const LIMIT_DOWN = 0.19;
// Held: a firm, slightly under-damped spring, so the ring trails the hand.
const DRAG_K = 120;
const DRAG_C = 2 * Math.sqrt(DRAG_K) * 0.72;
// Released: a slower spring home, with one small overshoot.
const HOME_K = 26;
const HOME_C = 2 * Math.sqrt(HOME_K) * 0.7;
// After release the ring keeps its place (and its momentum) this long before
// it starts home, so letting go never reads as a reset.
const HOLD_MS = 650;

const softLimit = (v: number, limit: number) => limit * Math.tanh(v / limit);

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
      grab: U('uGrab'), grabAmt: U('uGrabAmt'), hover: U('uHover'),
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

    let matteAlpha: Uint8Array | null = null;

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
      // A 96px copy of the alpha channel, read once, so the hit test can tell
      // when the pointer is over a part of the ring that is hidden by the head.
      try {
        const c = document.createElement('canvas');
        c.width = c.height = MATTE_N;
        const ctx = c.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(matte, 0, 0, MATTE_N, MATTE_N);
          const data = ctx.getImageData(0, 0, MATTE_N, MATTE_N).data;
          matteAlpha = new Uint8Array(MATTE_N * MATTE_N);
          for (let i = 0; i < matteAlpha.length; i++) matteAlpha[i] = data[i * 4 + 3];
        }
      } catch {
        matteAlpha = null; // hit test simply stops checking occlusion
      }
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
    const pointer = { x: -1e4, y: -1e4, nx: 0, ny: 0, tx: 0, ty: 0 };

    // The transform actually drawn last frame; the hit test reads it so that
    // what can be grabbed is exactly what is on screen.
    const view = { bx: 0, by: 0, bw: 1, cx: 0.5, cy: 0.5, radius: 0.4, tube: 0.15, tilt: 1, roll: 0, fade: 1 };
    // Spring state, in box widths. (ox, oy) is the offset added to the centre.
    const drag = {
      active: false, id: -1, hover: false,
      ox: 0, oy: 0, vx: 0, vy: 0, tx: 0, ty: 0,
      startX: 0, startY: 0, fromX: 0, fromY: 0,
      grabX: -1e4, grabY: -1e4, grabAmt: 0, hoverAmt: 0, releasedAt: -1e9,
    };

    /** Is (x, y), in canvas px, on a visible part of the ring? */
    const hitTest = (x: number, y: number) => {
      if (view.fade < 0.4) return false;
      const ct = Math.cos(view.tilt), st = Math.sin(view.tilt);
      const cr = Math.cos(view.roll), sr = Math.sin(view.roll);
      let best = Infinity, bestZ = 0, bestPersp = 1;
      let px0 = 0, py0 = 0;
      for (let i = 0; i <= HIT_SAMPLES; i++) {
        const u = (i / HIT_SAMPLES) * Math.PI * 2;
        const cu = Math.cos(u), su = Math.sin(u);
        const yT = su * ct, z = -su * st;
        const X = cu * cr - yT * sr, Y = cu * sr + yT * cr;
        const persp = 1 / (1 - z * 0.22);
        const sx = view.bx + (view.cx + X * view.radius * persp) * view.bw;
        const sy = view.by + (view.cy - Y * view.radius * persp) * view.bw;
        if (i > 0) {
          // distance from the pointer to this segment of the centreline
          const dx = sx - px0, dy = sy - py0;
          const len2 = dx * dx + dy * dy || 1;
          const k = Math.max(0, Math.min(1, ((x - px0) * dx + (y - py0) * dy) / len2));
          const ex = px0 + dx * k - x, ey = py0 + dy * k - y;
          const d = ex * ex + ey * ey;
          if (d < best) { best = d; bestZ = z; bestPersp = persp; }
        }
        px0 = sx; py0 = sy;
      }
      const tubePx = view.tube * view.radius * view.bw * bestPersp;
      if (Math.sqrt(best) > tubePx + 8) return false;
      // Far half, and the portrait covers this pixel: that arc is not visible.
      if (bestZ < 0 && matteAlpha) {
        const mx = Math.floor(((x - view.bx) / view.bw) * MATTE_N);
        const my = Math.floor(((y - view.by) / view.bw) * MATTE_N);
        if (mx >= 0 && my >= 0 && mx < MATTE_N && my < MATTE_N && matteAlpha[my * MATTE_N + mx] > 128) return false;
      }
      return true;
    };

    const setCursor = () => {
      const next = drag.active ? 'drag' : drag.hover ? 'hover' : '';
      if (stage.dataset.lattice !== next) stage.dataset.lattice = next;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.tx = (pointer.x / r.width) * 2 - 1;
      pointer.ty = (pointer.y / r.height) * 2 - 1;
      if (drag.active) {
        if (e.pointerId !== drag.id) return;
        drag.grabX = pointer.x;
        drag.grabY = pointer.y;
        drag.tx = drag.fromX + (pointer.x - drag.startX) / view.bw;
        drag.ty = drag.fromY + (pointer.y - drag.startY) / view.bw;
      } else {
        // Only over the stage itself: never under the nav, a link, or the
        // statement once it has risen over the hero.
        const over = e.target instanceof Node && stage.contains(e.target);
        drag.hover = over && hitTest(pointer.x, pointer.y);
        setCursor();
      }
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.button !== 0 || drag.active) return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (!hitTest(x, y)) return;
      e.preventDefault(); // no text selection, no image drag, no layout movement
      stage.setPointerCapture(e.pointerId);
      drag.active = true;
      drag.id = e.pointerId;
      drag.startX = drag.grabX = x;
      drag.startY = drag.grabY = y;
      // Continue from wherever the ring is, so re-grabbing mid-return is seamless.
      drag.fromX = drag.tx = drag.ox;
      drag.fromY = drag.ty = drag.oy;
      setCursor();
    };

    const endDrag = (e?: PointerEvent) => {
      if (!drag.active || (e && e.pointerId !== drag.id)) return;
      drag.active = false;
      drag.releasedAt = performance.now();
      // Let it coast a little in the direction it was travelling.
      drag.tx = drag.ox + drag.vx * 0.12;
      drag.ty = drag.oy + drag.vy * 0.12;
      if (stage.hasPointerCapture(drag.id)) stage.releasePointerCapture(drag.id);
      drag.hover = hitTest(pointer.x, pointer.y);
      setCursor();
    };
    const onBlur = () => endDrag();

    const onLeave = () => {
      pointer.x = pointer.y = -1e4;
      pointer.tx = pointer.ty = 0;
      if (!drag.active) {
        drag.hover = false;
        setCursor();
      }
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
      pointer.nx += (pointer.tx - pointer.nx) * 0.05;
      pointer.ny += (pointer.ty - pointer.ny) * 0.05;

      // --- user offset: pointer → target → spring → offset -----------------
      const dt = Math.min(1 / 30, Math.max(0, (now - last) / 1000));
      last = now;
      // Once the ring has opened into the next section it is scenery again.
      if (drag.active && lp > 0.7) endDrag();
      const homing = !drag.active && now - drag.releasedAt > HOLD_MS;
      const goalX = homing ? 0 : softLimit(drag.tx, LIMIT_X);
      const goalY = homing ? 0 : softLimit(drag.ty, drag.ty < 0 ? LIMIT_UP : LIMIT_DOWN);
      const k = homing ? HOME_K : DRAG_K;
      const c = homing ? HOME_C : DRAG_C;
      for (let i = 0; i < 2; i++) {
        const h = dt / 2;
        drag.vx += (k * (goalX - drag.ox) - c * drag.vx) * h;
        drag.vy += (k * (goalY - drag.oy) - c * drag.vy) * h;
        drag.ox += drag.vx * h;
        drag.oy += drag.vy * h;
      }
      // Elastic, not liquid: held still, the mesh only firms up around the hand;
      // the stretch appears while the ring is still catching up with it.
      const lag = Math.hypot(goalX - drag.ox, goalY - drag.oy);
      const pull = 0.045 + Math.min(0.15, lag * 1.1);
      const follow = 1 - Math.exp(-dt * 12);
      drag.grabAmt += ((drag.active ? 1 : 0) - drag.grabAmt) * follow;
      drag.hoverAmt += ((drag.active || drag.hover ? 1 : 0) - drag.hoverAmt) * follow;
      // It has mass: the ring leans into the direction it is being carried.
      const leanRoll = Math.max(-0.22, Math.min(0.22, drag.vx * 0.13));
      const leanTilt = Math.max(-0.2, Math.min(0.2, -drag.vy * 0.11));

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
      // Final transform = scroll-authored transform + temporary user offset.
      view.cx = 0.5 + drag.ox;
      view.cy = (small ? 0.6 : 0.545) + drag.oy;
      view.radius = (small ? 0.5 : 0.435) * (1 + ease * 2.6);
      view.tube = 0.15 - ease * 0.05;
      view.tilt = (1.0 + pointer.ny * 0.06) * (1 - ease * 0.8) + leanTilt;
      view.roll = -0.26 + pointer.nx * 0.05 + ease * 0.5 + leanRoll;
      view.fade = 1 - Math.min(1, Math.max(0, (lp - 0.7) / 0.3));
      view.bx = box[0];
      view.by = box[1];
      view.bw = box[2];
      gl!.uniform2f(loc.center, view.cx, view.cy);
      // Scrolling out: the ring turns to face the viewer and opens like an
      // aperture, so the page passes through it into the dark section.
      gl!.uniform1f(loc.radius, view.radius);
      gl!.uniform1f(loc.tube, view.tube);
      gl!.uniform1f(loc.tilt, view.tilt);
      gl!.uniform1f(loc.roll, view.roll);
      gl!.uniform2f(loc.grab, drag.grabX, drag.grabY);
      gl!.uniform1f(loc.grabAmt, drag.grabAmt * pull);
      gl!.uniform1f(loc.hover, drag.hoverAmt);
      gl!.uniform1f(loc.spin, t * 0.035);
      gl!.uniform1f(loc.time, t);
      gl!.uniform2f(loc.pointer, pointer.x, pointer.y);
      gl!.uniform1f(loc.dpr, dpr);
      gl!.uniform1f(loc.intro, reduced ? 1.1 : Math.min(1.1, ((now - start) / 1500) ** 0.8 * 1.1));
      gl!.uniform1f(loc.night, Math.min(1, Math.max(0, (hp - 0.02) / 0.14)));
      gl!.uniform1f(loc.fade, view.fade);
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
      stage.addEventListener('pointerdown', onDown);
      stage.addEventListener('pointerup', endDrag);
      stage.addEventListener('pointercancel', endDrag);
      stage.addEventListener('lostpointercapture', endDrag);
      window.addEventListener('blur', onBlur);
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
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointerup', endDrag);
      stage.removeEventListener('pointercancel', endDrag);
      stage.removeEventListener('lostpointercapture', endDrag);
      window.removeEventListener('blur', onBlur);
      delete stage.dataset.lattice;
      canvas.removeEventListener('webglcontextlost', onLost);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
    };
  }, [portraitSelector, matteSrc, progressSelector]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
