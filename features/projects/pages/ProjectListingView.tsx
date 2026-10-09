import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { ProjectSummary } from '@/features/projects/types';
import { projectText } from '@/features/projects/lib/story';
import ProjectCard from '@/features/projects/components/ProjectCard';

export default function ProjectListingView({ projects }: { projects: ProjectSummary[] | null }) {
  const records = Array.isArray(projects) ? projects.filter((project) => project && typeof project === 'object') : [];

  return (
    <main className="portfolio-work-page portfolio-container">
      <header className="portfolio-work-heading">
        <h1>Featured projects</h1>
        <p>Selected projects, what I built, and the decisions behind them.</p>
      </header>

      {records.length ? (
        <div className="portfolio-work-grid">
          {records.map((project, index) => (
            <ProjectCard
              key={project._id || `${projectText(project.slug?.current)}-${index}`}
              project={project}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="portfolio-work-empty">
          <h2>No featured projects yet.</h2>
          <p>Explore the rest of the portfolio in the meantime.</p>
          <Link href="/" className="portfolio-button portfolio-button-secondary">
            <ArrowLeft size={16} aria-hidden="true" />
            Back home
          </Link>
        </div>
      )}
    </main>
  );
}
