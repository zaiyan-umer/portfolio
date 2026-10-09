import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import FeaturedProject from '@/features/projects/components/FeaturedProject';
import type { ProjectSummary } from '@/features/projects/types';

export default function SelectedProjects({ projects }: { projects: ProjectSummary[] | null }) {
  const selected = Array.isArray(projects)
    ? projects.filter((project) => project && typeof project === 'object' && !Array.isArray(project)).slice(0, 3)
    : [];

  return (
    <section id="work" aria-labelledby="work-heading" className="portfolio-work portfolio-container">
      <div className="portfolio-section-heading">
        <div>
          <p className="portfolio-eyebrow">
            <span aria-hidden="true">01 / </span>Selected work
          </p>
          <h2 id="work-heading">
            Ideas, <span className="portfolio-work-made-real">
              made real<span className="portfolio-work-made-real-period" aria-hidden="true">.</span>
              <svg
                className="portfolio-work-made-real-arrow"
                viewBox="0 0 300 150"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M251 5L272 16C285 24 292 38 290 53C295 68 290 82 292 95C289 114 281 128 263 133C244 142 224 136 207 139S174 135 154 139S118 136 99 138S65 135 47 134C28 133 14 122 10 108C4 94 9 81 6 67C5 49 9 35 23 26C40 13 61 17 78 13S111 17 131 13S166 15 183 12S220 17 239 14C260 14 277 27 282 43C290 59 282 74 287 88C286 106 276 119 260 123C243 128 224 123 207 127S172 123 154 126S119 121 102 124S67 119 49 121C30 118 20 111 19 97C13 83 19 69 16 55C17 41 23 34 37 30C55 24 73 29 89 25S123 29 140 25S174 29 193 25S229 29 248 27C265 27 280 40 282 52C284 61 280 68 273 74"
                  vectorEffect="non-scaling-stroke"
                />
                <path d="M285 70L273 74L275 62" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>
          </h2>
        </div>
        <p>
          A few things I’ve built.
          <br />
          Take a closer look.
        </p>
      </div>
      {selected.length ? (
        <div className="portfolio-project-list">
          {selected.map((project, index) => (
            <FeaturedProject key={project._id} project={project} index={index} />
          ))}
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
