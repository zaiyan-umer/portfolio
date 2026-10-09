import { ArrowUpRight, ExternalLink, Github, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProjectSummary } from '@/features/projects/types';
import { urlFor } from '@/sanity/lib/imgUrl';

function thumbnailUrl(thumbnail: ProjectSummary['thumbnail']) {
  if (!thumbnail) return null;
  try {
    return urlFor(thumbnail).width(1200).height(750).fit('crop').auto('format').url();
  } catch {
    return null;
  }
}

export default function FeaturedProject({ project, index }: { project: ProjectSummary; index: number }) {
  const title = project.title?.trim() || 'Untitled project';
  const slug = project.slug?.current?.trim();
  const preview = thumbnailUrl(project.thumbnail);

  return (
    <article className="portfolio-project">
      <div className="portfolio-project-preview">
        <div className="portfolio-preview-toolbar" aria-hidden="true">
          <span className="portfolio-preview-dots">
            <i />
            <i />
            <i />
          </span>
          <span>PROJECT / {String(index + 1).padStart(2, '0')}</span>
          <ArrowUpRight size={14} />
        </div>
        <div className="portfolio-project-image">
          {preview ? (
            <Image
              src={preview}
              alt={`${title} interface preview`}
              width={1200}
              height={750}
              sizes="(min-width: 1216px) 660px, (min-width: 1024px) 58vw, calc(100vw - 40px)"
              className="portfolio-preview-image"
            />
          ) : (
            <div className="portfolio-project-placeholder">
              <ImageIcon size={32} strokeWidth={1.25} aria-hidden="true" />
              <span>Preview coming soon</span>
            </div>
          )}
        </div>
      </div>
      <div className="portfolio-project-copy">
        <span className="portfolio-project-index" aria-hidden="true">
          /{String(index + 1).padStart(2, '0')}
        </span>
        <h3>{title}</h3>
        {project.description ? <p className="portfolio-project-description">{project.description}</p> : null}
        {project.techStack?.length ? (
          <ul className="portfolio-project-tech" aria-label={`${title} technologies`}>
            {project.techStack.map((tech, techIndex) => (
              <li key={`${tech}-${techIndex}`}>{tech}</li>
            ))}
          </ul>
        ) : null}
        {slug ? (
          <Link
            href={`/projects/${encodeURIComponent(slug)}`}
            className="portfolio-case-study"
            aria-label={`View ${title} project`}
          >
            View project <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        ) : null}
        <div className="portfolio-project-external">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live demo (opens in a new tab)`}
            >
              <ExternalLink size={14} aria-hidden="true" /> Live demo
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} source code (opens in a new tab)`}
            >
              <Github size={15} aria-hidden="true" /> Source code
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
