import { normalizeExperience } from '@/features/home/lib/content';
import type { ExperienceData } from '@/features/home/types';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Experience({
  data,
  className,
}: {
  data: (ExperienceData | null)[] | null;
  className?: string;
}) {
  const entries = normalizeExperience(data);

  if (!entries.length) return null;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className={cn('portfolio-profile-section portfolio-container', className)}
    >
      <div className="portfolio-section-heading">
        <div>
          <p className="portfolio-eyebrow">
            <span aria-hidden="true">03 / </span>Experience
          </p>
          <h2 id="experience-heading">Experience.</h2>
        </div>
      </div>
      <ol className="portfolio-experience-list">
        {entries.map((item, index) => (
          <li key={item.id || `${item.company}-${item.role}-${index}`} className="portfolio-experience-entry">
            {item.startDate || item.endDate ? (
              <div className="portfolio-experience-meta">
                <p className="portfolio-experience-dates">
                  {[item.startDate, item.endDate].filter(Boolean).join(' – ')}
                </p>
                {item.endDate.toLowerCase() === 'present' ? (
                  <span className="portfolio-experience-current">Current</span>
                ) : null}
              </div>
            ) : null}
            <div className="portfolio-experience-copy">
              <h3>{item.role || item.company || 'Experience'}</h3>
              {item.company && item.role ? <p className="portfolio-experience-company">{item.company}</p> : null}
              {item.location ? <p className="portfolio-experience-location">{item.location}</p> : null}
              {item.summary ? <p className="portfolio-experience-summary">{item.summary}</p> : null}
              {item.bullets.length ? (
                <ul className="portfolio-experience-bullets">
                  {item.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {item.tags.length ? (
                <ul
                  className="portfolio-project-tech"
                  aria-label={`${item.role || item.company || 'Experience'} technologies`}
                >
                  {item.tags.map((tag, tagIndex) => (
                    <li key={`${tag}-${tagIndex}`}>{tag}</li>
                  ))}
                </ul>
              ) : null}
              {item.link ? (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-experience-link"
                  aria-label={`Learn more about ${item.company || item.role || 'this experience'}`}
                >
                  Learn more <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
