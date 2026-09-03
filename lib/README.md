# Content architecture

All site content lives in typed data files here, not hardcoded in components. To add
content, edit the relevant file and (if it includes an image) drop the image under
`public/media/<category>/` — then rebuild and deploy. No component changes needed for
a new entry of an existing type.

| File | Type | Used by |
|---|---|---|
| `publications.ts` | `Publication` | `/publications`, `/research`, `/` |
| `experience.ts` | `ExperienceEntry` | `/experience` |
| `teaching.ts` | `TeachingEntry` | `/teaching` |
| `awards.ts` | `Award` | `/awards`, `/` |
| `projects.ts` | `Project` | `/projects` |
| `research.ts` | `ResearchDirection` | `/research` |
| `media.ts` | `MediaItem` (press/public-activity mentions) | `/media` |
| `photos.ts` | `Photo` | wherever a real photo is placed editorially |
| `site-config.ts` | contact links, canonical URL | layout, nav, footer |

## Adding a photo

1. Add the optimized image to `public/media/<category>/` (`olympiads`, `robotics`,
   `university`, `research`, or `portraits` — add a new category folder if none fit).
2. Add one `Photo` entry in `photos.ts` with a factual caption. Set `verified: false`
   and a neutral caption if the event/date isn't independently confirmed.
3. Reference `getPhoto('id')` from wherever it belongs editorially (a page component).
   Don't add a generic "gallery" page — place photos where they support a specific
   achievement, role, or story beat.

## Adding a certificate/diploma

Attach it to the existing `Award` entry it documents (`certificateImage` /
`certificateUrl` fields), not a separate documents gallery. If a broad archive is ever
wanted for less prominent items, it can read from the same `awards.ts` array — no new
content type required.

## Not built yet, straightforward to add the same way

- `events.ts` (`Event` type) for individual talks/appearances with their own page,
  if `media.ts` entries ever need more than a title/blurb/link.
- A `certificates.ts` array, if certificate volume grows past what fits inline on
  `Award` entries.

## Future admin UI

The site is intentionally static (no database, no auth). If a private editor at
`/admin` is wanted later, the realistic options — in order of how much they preserve
this simplicity — are a Git-backed headless CMS (e.g. Decap CMS or Tina CMS) that
edits these same files via commits, a lightweight local script/CLI, or a hosted
form-to-PR tool. All of them read/write this same `lib/*.ts` + `public/media/`
structure — none require a database or server. Not implemented; do this only after
explicit approval.
