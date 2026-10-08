import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type ExperienceData = {
  _id?: string | null;
  company?: string | null;
  role?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  summary?: string | null;
  bullets?: (string | null)[] | null;
  tags?: (string | null)[] | null;
  link?: string | null;
};

const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';
const strings = (value: unknown): string[] => Array.isArray(value) ? value.map(text).filter(Boolean) : [];

export default function Experience({ data, className }: { data: (ExperienceData | null)[] | null; className?: string }) {
  const entries = Array.isArray(data) ? data.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const entry = {
      id: text(item._id), company: text(item.company), role: text(item.role),
      startDate: text(item.startDate), endDate: text(item.endDate),
      location: text(item.location), summary: text(item.summary),
      bullets: strings(item.bullets), tags: strings(item.tags), link: text(item.link),
    };
    return entry.role || entry.company || entry.summary || entry.bullets.length ? [entry] : [];
  }) : [];

  if (!entries.length) return null;

  return (
    <section id="experience" aria-labelledby="experience-heading" className={cn('portfolio-profile-section portfolio-container', className)}>
      <div className="portfolio-section-heading">
        <div>
          <p className="portfolio-eyebrow"><span aria-hidden="true">03 / </span>Experience</p>
          <h2 id="experience-heading">Experience.</h2>
        </div>
      </div>
      <ol className="portfolio-experience-list">
        {entries.map((item, index) => (
          <li key={item.id || `${item.company}-${item.role}-${index}`} className="portfolio-experience-entry">
            {item.startDate || item.endDate ? (
              <div className="portfolio-experience-meta">
                <p className="portfolio-experience-dates">{[item.startDate, item.endDate].filter(Boolean).join(' – ')}</p>
                {item.endDate.toLowerCase() === 'present' ? <span className="portfolio-experience-current">Current</span> : null}
              </div>
            ) : null}
            <div className="portfolio-experience-copy">
              <h3>{item.role || item.company || 'Experience'}</h3>
              {item.company && item.role ? <p className="portfolio-experience-company">{item.company}</p> : null}
              {item.location ? <p className="portfolio-experience-location">{item.location}</p> : null}
              {item.summary ? <p className="portfolio-experience-summary">{item.summary}</p> : null}
              {item.bullets.length ? (
                <ul className="portfolio-experience-bullets">
                  {item.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}>{bullet}</li>)}
                </ul>
              ) : null}
              {item.tags.length ? (
                <ul className="portfolio-project-tech" aria-label={`${item.role || item.company || 'Experience'} technologies`}>
                  {item.tags.map((tag, tagIndex) => <li key={`${tag}-${tagIndex}`}>{tag}</li>)}
                </ul>
              ) : null}
              {item.link ? (
                <Link href={item.link} target="_blank" rel="noopener noreferrer" className="portfolio-experience-link" aria-label={`Learn more about ${item.company || item.role || 'this experience'}`}>
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
