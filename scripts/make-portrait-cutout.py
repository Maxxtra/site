#!/usr/bin/env python3
"""Build the homepage hero cutout from a studio-style portrait.

The hero layers a lattice *behind and in front of* the subject, which needs a
real alpha matte rather than a rectangular photo. This removes a plain, bright,
neutral backdrop (white wall / seamless paper) and nothing else: pixels of the
subject are never generated, warped or retouched.

Usage:
    python3 scripts/make-portrait-cutout.py [source.jpg] [output.webp]

Replacing the portrait later: shoot against a plain light backdrop, run this
script on the new file, keep the output path. The hero reads the intrinsic size
from lib/photos.ts, so a different aspect ratio only needs those two numbers
updated. A source that is already a transparent PNG/WebP can skip this script.

Requires: pillow, numpy, scipy.
"""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

SRC = sys.argv[1] if len(sys.argv) > 1 else 'public/media/portraits/costin-portrait.jpg'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'public/media/portraits/costin-portrait-cutout.webp'

rgb = np.asarray(Image.open(SRC).convert('RGB')).astype(np.float32)
h, w, _ = rgb.shape
lum = rgb @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
chroma = rgb.max(axis=2) - rgb.min(axis=2)

# 1. Backdrop candidates: bright and close to neutral. Skin is bright but
#    clearly chromatic, hair and clothing are dark, so neither qualifies.
candidate = (lum > 168) & (chroma < 26)

# 2. Keep only candidates connected to the top/left/right borders, so bright
#    neutral areas *inside* the subject (eye whites, specular skin) survive.
labels, _ = ndi.label(candidate)
border = np.concatenate([labels[0, :], labels[:, 0], labels[:, -1]])
backdrop = np.isin(labels, np.unique(border[border > 0]))
backdrop = ndi.binary_opening(backdrop, iterations=2)

# 3. Local backdrop colour (the wall is slightly uneven), filled inward from
#    known backdrop pixels by normalised blurring.
weight = ndi.gaussian_filter(backdrop.astype(np.float32), 40)
bg = np.stack(
    [ndi.gaussian_filter(rgb[..., c] * backdrop, 40) / np.maximum(weight, 1e-4) for c in range(3)],
    axis=2,
)
bg = np.where(weight[..., None] > 1e-3, bg, rgb[backdrop].mean(axis=0))

# 4. Soft matte. Solid core = well inside the subject. In the transition band
#    alpha follows how far a pixel departs from the local backdrop colour,
#    which keeps flyaway hair semi-transparent instead of a hard stair-step.
subject = ndi.binary_fill_holes(~backdrop)
core = ndi.binary_erosion(subject, iterations=9)
departure = np.abs(bg - rgb).max(axis=2)
soft = np.clip((departure - 38.0) / 60.0, 0.0, 1.0)
band = ndi.binary_dilation(subject, iterations=2) & ~core
alpha = np.where(core, 1.0, np.where(band, soft, 0.0)).astype(np.float32)
# Choke by ~1.5px: the wall casts a faint contact shadow around the subject
# that would otherwise read as a grey halo on dark grounds.
alpha = ndi.minimum_filter(alpha, size=3)
alpha = ndi.gaussian_filter(alpha, 0.9)

# 5. Decontaminate the fringe: remove the backdrop's share of edge pixels so
#    no white halo appears when the cutout sits on a dark ground.
a = alpha[..., None]
clean = np.where(a > 0.02, (rgb - (1.0 - a) * bg) / np.maximum(a, 0.02), rgb)
clean = np.clip(clean, 0, 255)

rgba = np.dstack([clean, alpha * 255.0]).round().astype(np.uint8)
Image.fromarray(rgba, 'RGBA').save(OUT, 'WEBP', quality=90, method=6, exact=False)
print(f'{OUT}: {w}x{h}, subject covers {alpha.mean() * 100:.1f}% of the frame')
