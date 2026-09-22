import type { Metadata } from 'next';
import Link from 'next/link';
import { EditorialMotion } from '@/components/editorial/motion';
import { Copy, pad } from '@/components/editorial/copy';
import { researchDirections } from '@/lib/research';
import { publications } from '@/lib/publications';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  alternates: { canonical: '/research/' },
  title: 'Research',
  description:
    'Research directions pursued by Costin-Alexandru Deonise: scalable high-order automatic differentiation, privacy-preserving machine learning, and LLM systems for structured language understanding.',
};

/*
 * Composition: an opening statement, then one spread per direction. The title
 * and its status sit on one side, the argument (problem, approach, result)
 * stacks on the other, and the sides alternate down the page, so four
 * directions read as four pages of a journal rather than four rows of a table.
 */
export default function ResearchPage() {
  return (
    <main className="editorial page research">
      <EditorialMotion>
        <section className="page-section" data-nav-theme="light">
          <div className="lines" aria-hidden="true">
            <div className="contours" />
          </div>
          <header className="page-head">
            <p className="eyebrow">Research</p>
            <h1 className="display" data-rise>
              Scalable differentiation, <em>private</em> inference, and structured language.
            </h1>
            <p className="page-lede" data-rise>
              <Copy text="Parallel and Distributed Computer Systems research at POLITEHNICA Bucharest, applied AI engineering at the Research Institute, and production ML at Bitdefender. Four directions, spanning published results and ongoing work." />
            </p>
            <p className="page-count">
              <b>{pad(researchDirections.length)}</b>
              directions
            </p>
          </header>

          {researchDirections.map((dir, i) => {
            const related = dir.relatedPublications
              .map((slug) => publications.find((p) => p.slug === slug))
              .filter((p): p is (typeof publications)[number] => Boolean(p));
            const relatedProjects = (dir.relatedProjects ?? [])
              .map((slug) => projects.find((p) => p.slug === slug))
              .filter((p): p is (typeof projects)[number] => Boolean(p));

            return (
              <article key={dir.slug} id={dir.slug} className="page-grid direction">
                <div className="direction-head">
                  <p className="direction-tags meta">
                    <span className="ledger-index">{pad(i + 1)}</span>
                    <span className={dir.status === 'published' ? 'status--published' : undefined}>
                      {dir.status === 'published' ? 'Published' : 'Ongoing'}
                    </span>
                    <span>{dir.period}</span>
                  </p>
                  <h2 className="direction-title" data-rise>
                    {dir.title}
                  </h2>
                </div>

                <div className="direction-body">
                  <dl>
                    <div className="argument" data-rise>
                      <dt>Problem</dt>
                      <dd>
                        <Copy text={dir.problem} />
                      </dd>
                    </div>
                    <div className="argument" data-rise>
                      <dt>Approach</dt>
                      <dd>
                        <Copy text={dir.approach} />
                      </dd>
                    </div>
                    <div className="argument" data-rise>
                      <dt>Result</dt>
                      <dd>
                        <Copy text={dir.result} />
                      </dd>
                    </div>
                  </dl>
                  {(related.length > 0 || relatedProjects.length > 0) && (
                    <ul className="direction-links">
                      {related.map((pub) => (
                        <li key={pub.slug}>
                          <Link href={`/publications#${pub.slug}`} className="mono-link">
                            {pub.venue.replace(/ \(.*\)$/, '')} {pub.year} <span aria-hidden="true">↗</span>
                          </Link>
                        </li>
                      ))}
                      {relatedProjects.map((project) => (
                        <li key={project.slug}>
                          <Link href={`/projects#${project.slug}`} className="mono-link mono-link--quiet">
                            Project <span aria-hidden="true">↗</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </EditorialMotion>
    </main>
  );
}
