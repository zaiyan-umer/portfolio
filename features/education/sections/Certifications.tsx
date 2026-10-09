import { ArrowUpRight } from 'lucide-react';
import { CertificationLogo } from '@/features/education/components/CertificationLogo';
import { educationCertifications } from '@/features/education/lib/content';
import type { CertificationData } from '@/features/education/types';
import { cn } from '@/lib/utils';

export function Certifications({ data, className }: { data: CertificationData[] | null; className?: string }) {
  const certifications = educationCertifications(data);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className={cn('portfolio-education-section', className)}
    >
      <header className="portfolio-education-section-heading">
        <p className="portfolio-eyebrow">02 / Certifications</p>
        <h2 id="certifications-heading">Learning beyond the classroom.</h2>
      </header>
      {certifications.length ? (
        <div className="portfolio-education-grid">
          {certifications.map((certification) => {
            const title = certification.title || 'Untitled certification';
            return (
              <article key={certification.key} className="portfolio-education-card portfolio-certification-card">
                <div className="portfolio-certification-meta">
                  <CertificationLogo src={certification.image} issuer={certification.issuer} />
                  <div>
                    {certification.issuer ? (
                      <p className="portfolio-certification-issuer">{certification.issuer}</p>
                    ) : null}
                    {certification.date ? <p className="portfolio-certification-date">{certification.date}</p> : null}
                  </div>
                </div>
                <h3>{title}</h3>
                {certification.credentialId ? (
                  <dl className="portfolio-certification-credential">
                    <dt>Credential ID</dt>
                    <dd>{certification.credentialId}</dd>
                  </dl>
                ) : null}
                {certification.tags.length ? (
                  <ul className="portfolio-project-tech" aria-label={`${title} topics`}>
                    {certification.tags.map((tag, index) => (
                      <li key={`${tag}-${index}`}>{tag}</li>
                    ))}
                  </ul>
                ) : null}
                {certification.link ? (
                  <a
                    href={certification.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-certification-link"
                    aria-label={`View ${title} certificate (opens in a new tab)`}
                  >
                    View certificate
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : (
        <p className="portfolio-education-empty">Certifications are not available yet.</p>
      )}
    </section>
  );
}
