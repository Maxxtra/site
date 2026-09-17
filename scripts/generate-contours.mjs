// Generates public/graphics/contours.svg: the site's background linework.
//
// The lines are level sets of a smooth scalar field (a handful of anisotropic
// Gaussian bumps), i.e. the contour map of a small loss landscape, with its
// stationary points marked. Deterministic: same seed, same file.
//
//   node scripts/generate-contours.mjs
//
// The SVG is used as a CSS mask (see .contours in app/globals.css), so its
// colour comes from the page, not from this file.
import { writeFileSync, mkdirSync } from 'node:fs';

const W = 1600;
const H = 1000;
const COLS = 240;
const ROWS = 150;
const LEVELS = [-0.62, -0.38, -0.16, 0.06, 0.28, 0.5, 0.74];
const SEED = 20260917;

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(SEED);
const bumps = Array.from({ length: 9 }, (_, i) => ({
  x: rand() * 1.3 - 0.15,
  y: rand() * 1.3 - 0.15,
  sx: 0.16 + rand() * 0.24,
  sy: 0.14 + rand() * 0.22,
  rot: rand() * Math.PI,
  amp: (i % 2 === 0 ? 1 : -1) * (0.55 + rand() * 0.6),
}));

function field(nx, ny) {
  let v = 0;
  for (const b of bumps) {
    const dx = nx - b.x;
    const dy = (ny - b.y) * (H / W);
    const c = Math.cos(b.rot);
    const s = Math.sin(b.rot);
    const u = (dx * c + dy * s) / b.sx;
    const w = (-dx * s + dy * c) / b.sy;
    v += b.amp * Math.exp(-(u * u + w * w));
  }
  return v + 0.12 * Math.sin(nx * 3.1 + ny * 1.7);
}

const grid = [];
for (let j = 0; j <= ROWS; j++) {
  const row = new Float64Array(COLS + 1);
  for (let i = 0; i <= COLS; i++) row[i] = field(i / COLS, j / ROWS);
  grid.push(row);
}

const cw = W / COLS;
const ch = H / ROWS;
const key = (p) => `${Math.round(p[0] * 8)},${Math.round(p[1] * 8)}`;

// Marching squares → unordered segments for one level.
function segmentsFor(level) {
  const segs = [];
  const lerp = (a, b, va, vb) => {
    const t = (level - va) / (vb - va);
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  };
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      const p = [
        [i * cw, j * ch],
        [(i + 1) * cw, j * ch],
        [(i + 1) * cw, (j + 1) * ch],
        [i * cw, (j + 1) * ch],
      ];
      const v = [grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]];
      const idx = (v[0] > level ? 8 : 0) | (v[1] > level ? 4 : 0) | (v[2] > level ? 2 : 0) | (v[3] > level ? 1 : 0);
      if (idx === 0 || idx === 15) continue;
      const top = () => lerp(p[0], p[1], v[0], v[1]);
      const right = () => lerp(p[1], p[2], v[1], v[2]);
      const bottom = () => lerp(p[3], p[2], v[3], v[2]);
      const left = () => lerp(p[0], p[3], v[0], v[3]);
      const table = {
        1: [[left, bottom]], 2: [[bottom, right]], 3: [[left, right]], 4: [[top, right]],
        5: [[top, left], [bottom, right]], 6: [[top, bottom]], 7: [[top, left]], 8: [[top, left]],
        9: [[top, bottom]], 10: [[top, right], [left, bottom]], 11: [[top, right]], 12: [[left, right]],
        13: [[bottom, right]], 14: [[left, bottom]],
      };
      for (const [a, b] of table[idx]) segs.push([a(), b()]);
    }
  }
  return segs;
}

// Stitch segments into polylines by shared endpoints.
function stitch(segs) {
  const ends = new Map();
  const add = (k, s) => (ends.has(k) ? ends.get(k).push(s) : ends.set(k, [s]));
  segs.forEach((s) => { add(key(s[0]), s); add(key(s[1]), s); });
  const used = new Set();
  const lines = [];
  const next = (pt, from) => (ends.get(key(pt)) ?? []).find((s) => s !== from && !used.has(s));
  for (const seg of segs) {
    if (used.has(seg)) continue;
    used.add(seg);
    const line = [seg[0], seg[1]];
    for (const dir of [1, 0]) {
      let tip = dir ? line[line.length - 1] : line[0];
      let cur = next(tip, seg);
      while (cur) {
        used.add(cur);
        tip = key(cur[0]) === key(tip) ? cur[1] : cur[0];
        if (dir) line.push(tip); else line.unshift(tip);
        cur = next(tip, cur);
      }
    }
    lines.push(line);
  }
  return lines;
}

const f = (n) => Number(n.toFixed(1));

// Smooth polyline → quadratic path through segment midpoints.
function toPath(line) {
  const pts = line.filter((_, i) => i % 3 === 0 || i === line.length - 1);
  if (pts.length < 4) return '';
  const closed = key(line[0]) === key(line[line.length - 1]);
  let d = '';
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  if (closed) {
    pts.pop();
    const n = pts.length;
    const m0 = mid(pts[n - 1], pts[0]);
    d = `M${f(m0[0])} ${f(m0[1])}`;
    for (let i = 0; i < n; i++) {
      const m = mid(pts[i], pts[(i + 1) % n]);
      d += `Q${f(pts[i][0])} ${f(pts[i][1])} ${f(m[0])} ${f(m[1])}`;
    }
    return `${d}Z`;
  }
  d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const m = mid(pts[i], pts[i + 1]);
    d += `Q${f(pts[i][0])} ${f(pts[i][1])} ${f(m[0])} ${f(m[1])}`;
  }
  const last = pts[pts.length - 1];
  return `${d}L${f(last[0])} ${f(last[1])}`;
}

const paths = LEVELS.flatMap((level) => stitch(segmentsFor(level)).map(toPath)).filter(Boolean);

// Stationary points (grad f = 0): strict local extrema on the grid, marked "+".
const marks = [];
for (let j = 6; j < ROWS - 6; j++) {
  for (let i = 6; i < COLS - 6; i++) {
    const v = grid[j][i];
    let max = true;
    let min = true;
    for (let dj = -3; dj <= 3; dj++) {
      for (let di = -3; di <= 3; di++) {
        if (!di && !dj) continue;
        if (grid[j + dj][i + di] >= v) max = false;
        if (grid[j + dj][i + di] <= v) min = false;
      }
    }
    if ((max || min) && Math.abs(v) > 0.3) marks.push([i * cw, j * ch]);
  }
}
const markPath = marks
  .map(([x, y]) => `M${f(x - 7)} ${f(y)}h14M${f(x)} ${f(y - 7)}v14`)
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" fill="none" stroke="#000" stroke-width="1.1" stroke-linecap="round"><path vector-effect="non-scaling-stroke" d="${paths.join('')}"/><path vector-effect="non-scaling-stroke" stroke-width="1.4" d="${markPath}"/></svg>\n`;

mkdirSync('public/graphics', { recursive: true });
writeFileSync('public/graphics/contours.svg', svg);
console.log(`contours.svg: ${paths.length} paths, ${marks.length} stationary points, ${(svg.length / 1024).toFixed(1)} KB`);
