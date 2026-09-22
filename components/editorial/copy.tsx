/**
 * Editorial copy: a hyphenated compound ("open-weight", "multi-GPU") never
 * breaks across lines on wide screens, which is where most ragged, messy
 * wraps come from. Below 768px the stylesheet lets them break again.
 *
 * Returns several nodes: never make its parent a flex or grid container
 * directly; wrap it in one element.
 */
export function Copy({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\S+-\S+)/).map((part, i) =>
        /\S-\S/.test(part) ? (
          <span key={i} className="nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export const pad = (n: number) => String(n).padStart(2, '0');
