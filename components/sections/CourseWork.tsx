import { ArrowUpRight } from 'lucide-react';
import { CertificationLogo } from '@/components/ui/CertificationLogo';
import { educationCertifications, educationCourses, type CertificationData, type CourseCategoryData } from '@/lib/education';
import { cn } from '@/lib/utils';

export function CourseWork({ data, className }: { data: CourseCategoryData[] | null; className?: string }) {
  const categories = educationCourses(data);

  return (
    <section id="course-work" aria-labelledby="coursework-heading" className={cn('portfolio-education-section', className)}>
      <header className="portfolio-education-section-heading">
        <p className="portfolio-eyebrow">01 / Coursework</p>
        <h2 id="coursework-heading">A foundation in computer science.</h2>
        <p>BSCS - National University of Computer and Emerging Sciences (FAST)</p>
      </header>
      {categories.length ? <div className="portfolio-education-grid">
        {categories.map(category => <article key={category.key} className="portfolio-education-card portfolio-course-card">
          <h3>{category.title || 'Coursework'}</h3>
          {category.courses.length ? <ul className="portfolio-course-list">
            {category.courses.map((course, index) => <li key={`${course}-${index}`}>{course}</li>)}
          </ul> : <p className="portfolio-education-muted">Course details are not available yet.</p>}
        </article>)}
      </div> : <p className="portfolio-education-empty">Coursework details are not available yet.</p>}
    </section>
  );
}

export function Certifications({ data, className }: { data: CertificationData[] | null; className?: string }) {
  const certifications = educationCertifications(data);

  return (
    <section id="certifications" aria-labelledby="certifications-heading" className={cn('portfolio-education-section', className)}>
      <header className="portfolio-education-section-heading">
        <p className="portfolio-eyebrow">02 / Certifications</p>
        <h2 id="certifications-heading">Learning beyond the classroom.</h2>
      </header>
      {certifications.length ? <div className="portfolio-education-grid">
        {certifications.map(certification => {
          const title = certification.title || 'Untitled certification';
          return <article key={certification.key} className="portfolio-education-card portfolio-certification-card">
            <div className="portfolio-certification-meta">
              <CertificationLogo src={certification.image} issuer={certification.issuer} />
              <div>{certification.issuer ? <p className="portfolio-certification-issuer">{certification.issuer}</p> : null}
                {certification.date ? <p className="portfolio-certification-date">{certification.date}</p> : null}</div>
            </div>
            <h3>{title}</h3>
            {certification.credentialId ? <dl className="portfolio-certification-credential"><dt>Credential ID</dt><dd>{certification.credentialId}</dd></dl> : null}
            {certification.tags.length ? <ul className="portfolio-project-tech" aria-label={`${title} topics`}>
              {certification.tags.map((tag, index) => <li key={`${tag}-${index}`}>{tag}</li>)}
            </ul> : null}
            {certification.link ? <a href={certification.link} target="_blank" rel="noopener noreferrer" className="portfolio-certification-link" aria-label={`View ${title} certificate (opens in a new tab)`}>View certificate<ArrowUpRight size={16} aria-hidden="true" /></a> : null}
          </article>;
        })}
      </div> : <p className="portfolio-education-empty">Certifications are not available yet.</p>}
    </section>
  );
}
