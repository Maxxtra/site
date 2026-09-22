import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { EditorialMotion } from '@/components/editorial/motion';
import { Plate } from '@/components/editorial/plate';
import { Copy, Lines, pad, splitTitle } from '@/components/editorial/copy';
import { projects } from '@/lib/projects';
import { getPhoto } from '@/lib/photos';

export const metadata: Metadata = pageMetadata({
  path: '/projects/',
  title: 'Projects',
  description:
    'Selected projects by Costin-Alexandru Deonise: AlgoTrack, AtlasRAG, a multi-GPU JAX implementation of STDE, AlphaZ FRC robotics, and anti-money-laundering detection.',
  ogType: 'website',
});

/*
 * Composition: an ink page. Each project is a spread with the title and a
 * didone summary on one side and the work (results, stack, links) on the
 * other, alternating sides down the page. AlphaZ carries its trophy photo as
 * a tall plate bleeding off the left edge.
 */
export default function ProjectsPage() {
  return (
    <main className="editorial page projects">
      <EditorialMotion>
        <section className="page-section page-section--ink" data-nav-theme="dark">
          <div className="lines" aria-hidden="true">
            <div className="contours" />
          </div>
          <header className="page-head page-head--index">
            <p className="eyebrow">Projects</p>
            <p className="page-tally">{pad(projects.length)} projects</p>
            <h1 className="display" data-rise>
              Selected builds, from production <em>platforms</em> to competition robots.
            </h1>
            <p className="page-lede" data-rise>
              <Copy text="A tutoring platform in production use, a multi-GPU JAX implementation of STDE, a multimodal retrieval system, a rookie FRC robot whose team received the Rookie All-Star Award at the FIRST World Championship, and a transaction-monitoring model trained on 32M+ transactions." />
            </p>
          </header>

          <div style={{ paddingBottom: 'clamp(5rem, 10vw, 10rem)' }}>
            {projects.map((project, i) => {
              const photo = project.photoId ? getPhoto(project.photoId) : undefined;
              return (
                <article key={project.slug} id={project.slug} className={`page-grid project${photo ? ' project--photo' : ''}`}>
                  {photo && <Plate photo={photo} drift={5} sizes="(min-width: 768px) 30vw, 100vw" />}
                  <div className="project-head">
                    <p className="meta">
                      <span className="ledger-index">{pad(i + 1)}</span>
                      {'  '}
                      {project.period}
                    </p>
                    {/* "Name · Descriptor" in the data: the name is the title, the
                        descriptor a smaller line beneath it. */}
                    <h2 className="project-title" data-rise>
                      <Lines parts={splitTitle(project.title)} />
                    </h2>
                    <p className="project-summary" data-rise>
                      <Copy text={project.summary} />
                    </p>
                    {project.links && project.links.length > 0 && (
                      <ul className="link-row">
                        {project.links.map((link) =>
                          link.href.startsWith('http') ? (
                            <li key={link.href}>
                              <a href={link.href} target="_blank" rel="noreferrer" className="mono-link">
                                {link.label} <span aria-hidden="true">↗</span>
                              </a>
                            </li>
                          ) : (
                            <li key={link.href}>
                              <Link href={link.href} className="mono-link">
                                {link.label} <span aria-hidden="true">↗</span>
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                  <div className="project-work">
                    <ul className="project-bullets">
                      {project.bullets.map((bullet, b) => (
                        <li key={b} data-rise>
                          <Copy text={bullet} />
                        </li>
                      ))}
                    </ul>
                    <dl className="project-stack">
                      <dt>Stack</dt>
                      <dd>{project.stack.join(' / ')}</dd>
                    </dl>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </EditorialMotion>
    </main>
  );
}
