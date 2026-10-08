import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import FeaturedProject from '@/components/projects/FeaturedProject';
import type { ProjectSummary } from '@/lib/project.types';

export default function SelectedProjects({ projects }: { projects: ProjectSummary[] | null }) {
  const selected = (projects ?? []).slice(0, 3);

  return (
    <section id="work" aria-labelledby="work-heading" className="portfolio-work portfolio-container">
      <div className="portfolio-section-heading">
        <div>
          <p className="portfolio-eyebrow"><span aria-hidden="true">01 / </span>Selected work</p>
          <h2 id="work-heading">Ideas, made real<span aria-hidden="true">.</span></h2>
        </div>
        <p>A few things I’ve built.<br />Take a closer look.</p>
      </div>
      {selected.length ? (
        <div className="portfolio-project-list">
          {selected.map((project, index) => <FeaturedProject key={project._id} project={project} index={index} />)}
        </div>
      ) : (
        <div className="portfolio-work-empty">
          <p>No featured projects to show yet.</p>
          <p>Visit the projects page or get in touch to learn more about my work.</p>
        </div>
      )}
      <div className="portfolio-work-footer">
        <span>There’s more to explore.</span>
        <Link href="/projects" className="portfolio-button portfolio-button-secondary">
          Browse projects <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
