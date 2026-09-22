#!/usr/bin/env python3
"""Build the graded hero portrait: a non-destructive derivative.

Inputs are never modified:
    public/media/portraits/costin-portrait.jpg           the photograph
    public/media/portraits/costin-portrait-cutout.webp   its matte (make-portrait-cutout.py)
Output:
    public/media/portraits/costin-portrait-cutout-graded.webp

To revert, point `cutoutSrc` in lib/photos.ts back at the ungraded cutout.

What this does, and nothing else: a colour grade, a cleaner matte edge, and a
high-quality upsample. No retouching: no skin smoothing, no reshaping, no
generated pixels. Every step is a global or luminance-local tone operation.

    python3 scripts/grade-portrait.py [--size 1600]

Requires: pillow, numpy, scipy.
"""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

SRC = 'public/media/portraits/costin-portrait.jpg'
MATTE = 'public/media/portraits/costin-portrait-cutout.webp'
OUT = 'public/media/portraits/costin-portrait-cutout-graded.webp'
SIZE = int(sys.argv[sys.argv.index('--size') + 1]) if '--size' in sys.argv else 1600

# ---- the grade, as numbers ---------------------------------------------------
WB = np.array([1.028, 1.010, 0.962], dtype=np.float32)  # warmer, less magenta
GAMMA = 1.10          # pulls the pale mid-tones down: the "washed out" fix
S_CURVE = 0.15        # mid-tone contrast; end points fixed, so blacks are richer, not crushed
SHADOW_LIFT = 0.035    # keeps eye sockets and hair from blocking up
HIGHLIGHT_KNEE = 0.80  # above this, highlights are compressed…
HIGHLIGHT_SLOPE = 0.80  # …to this slope, so the forehead keeps its texture
CLARITY_SIGMA = 0.020  # local contrast radius, as a fraction of image width
CLARITY = 0.22         # …and amount, mid-tones only
DETAIL_SIGMA = 1.6     # fine detail, px at source size
DETAIL = 0.12
SATURATION = 1.05
LUMA = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)

rgb = np.asarray(Image.open(SRC).convert('RGB')).astype(np.float32) / 255.0
alpha = np.asarray(Image.open(MATTE).convert('RGBA'))[..., 3].astype(np.float32) / 255.0
assert rgb.shape[:2] == alpha.shape, 'matte and photograph must be the same size'
h, w = alpha.shape

# ---- matte edge ---------------------------------------------------------------
# The source matte has stair-stepped clumps in the hair at hero scale. Blur it
# slightly, then re-tighten with a smoothstep: same silhouette, clean contour.
a = ndi.gaussian_filter(alpha, 1.5)
a = np.clip((a - 0.22) / 0.56, 0.0, 1.0)
alpha = a * a * (3.0 - 2.0 * a)

# Decontaminate the rim. Strands and skin at the silhouette were photographed
# half-mixed with a bright wall, which leaves a pale outline that glows on the
# dark ground. A bright backdrop can only ever lighten, so within a few pixels
# of the edge, pixels lighter than the subject just inside them are pulled
# toward that inner colour; darker detail is left exactly as shot.
solid = alpha > 0.97
deep = ndi.binary_erosion(solid, iterations=5)
# Colour of the nearest pixel well inside the subject, for every pixel outside
# it. A nearest-pixel lookup reaches the tips of flyaway strands, which a blur
# radius cannot. Smoothed so the lookup never shows as a Voronoi pattern.
dist, (iy, ix) = ndi.distance_transform_edt(~deep, return_indices=True)
inner = rgb[iy, ix]
inner = np.stack([ndi.gaussian_filter(inner[..., c], 2.0) for c in range(3)], axis=2)
band = (~deep) & (dist < 0.035 * w)
excess = (rgb @ LUMA) - (inner @ LUMA)
t = np.clip((excess - 0.02) / 0.08, 0.0, 1.0) * band
rgb = rgb + (inner - rgb) * (0.85 * t)[..., None]
core = solid.astype(np.float32)

# ---- colour grade -------------------------------------------------------------
x = rgb * WB
lum0 = np.maximum(x @ LUMA, 1e-4)

lum = np.clip(lum0, 0, 1) ** GAMMA
lum = lum - S_CURVE * np.sin(2 * np.pi * lum) / (2 * np.pi)
lum = lum + SHADOW_LIFT * (1.0 - lum) ** 6  # open the deepest shadows a touch
lum = np.where(lum > HIGHLIGHT_KNEE, HIGHLIGHT_KNEE + (lum - HIGHLIGHT_KNEE) * HIGHLIGHT_SLOPE, lum)

# Local contrast, measured against the subject only (alpha-normalised blur), so
# the bright wall never bleeds a halo into the face.
sigma = CLARITY_SIGMA * w
norm = np.maximum(ndi.gaussian_filter(alpha, sigma), 1e-3)
local = ndi.gaussian_filter(lum * alpha, sigma) / norm
mid = 4.0 * lum * (1.0 - lum)  # 1 in the mid-tones, 0 at black and white
lum = lum + CLARITY * (lum - local) * mid * alpha

# Fine detail, kept off the matte edge. This is an unsharp mask on luminance at
# a low amount and a radius above the JPEG grain, so it firms edges (eyes, brows,
# lips) without turning compression noise into skin texture.
fine = ndi.gaussian_filter(lum, DETAIL_SIGMA)
lum = lum + DETAIL * (lum - fine) * ndi.gaussian_filter(core, 2.0)
lum = np.clip(lum, 0.0, 1.0)

x = x * (lum / lum0)[..., None]          # apply the tone change, keep hue
grey = (x @ LUMA)[..., None]
x = np.clip(grey + (x - grey) * SATURATION, 0.0, 1.0)

# ---- upsample -----------------------------------------------------------------
# Lanczos on premultiplied colour (no fringes), so a 2x display starts from a
# better interpolation than the browser's bilinear one.
pre = np.dstack([x * alpha[..., None], alpha])
img = Image.fromarray((pre * 255.0 + 0.5).astype(np.uint8), 'RGBA')
if SIZE != w:
    img = Image.merge('RGBA', [band.resize((SIZE, round(h * SIZE / w)), Image.LANCZOS) for band in img.split()])
out = np.asarray(img).astype(np.float32) / 255.0
oa = out[..., 3:4]
out[..., :3] = np.where(oa > 1e-3, out[..., :3] / np.maximum(oa, 1e-3), 0.0)
Image.fromarray((np.clip(out, 0, 1) * 255.0 + 0.5).astype(np.uint8), 'RGBA').save(OUT, 'WEBP', quality=92, method=6)

print(f'{OUT}: {img.size[0]}x{img.size[1]}')
