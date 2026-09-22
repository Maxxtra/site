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

/**
 * Parts that the stylesheet sets on separate lines ("Title", "Qualifier").
 * A real space goes between them, so textContent, screen readers, search
 * snippets and copy/paste read "Title Qualifier", never "TitleQualifier".
 * The space is invisible where it sits: before a block-level box it collapses,
 * and between flex or grid items it is not rendered at all.
 */
export function Lines({ parts, restClassName }: { parts: string[]; restClassName?: string }) {
  return (
    <>
      {parts.map((part, i) => (
        <span key={part + i} className={i > 0 ? restClassName : undefined}>
          {i > 0 && ' '}
          <Copy text={part} />
        </span>
      ))}
    </>
  );
}

/** "Title · Qualifier" in the data → ["Title", "Qualifier"]. */
export const splitTitle = (title: string) => title.split(' · ');
