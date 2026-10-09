import { educationCourses } from '@/features/education/lib/content';
import type { CourseCategoryData } from '@/features/education/types';
import { cn } from '@/lib/utils';

export function CourseWork({ data, className }: { data: CourseCategoryData[] | null; className?: string }) {
  const categories = educationCourses(data);

  return (
    <section
      id="course-work"
      aria-labelledby="coursework-heading"
      className={cn('portfolio-education-section', className)}
    >
      <header className="portfolio-education-section-heading">
        <p className="portfolio-eyebrow">01 / Coursework</p>
        <h2 id="coursework-heading">A foundation in computer science.</h2>
        <p>BSCS - National University of Computer and Emerging Sciences (FAST)</p>
      </header>
      {categories.length ? (
        <div className="portfolio-education-grid">
          {categories.map((category) => (
            <article key={category.key} className="portfolio-education-card portfolio-course-card">
              <h3>{category.title || 'Coursework'}</h3>
              {category.courses.length ? (
                <ul className="portfolio-course-list">
                  {category.courses.map((course, index) => (
                    <li key={`${course}-${index}`}>{course}</li>
                  ))}
                </ul>
              ) : (
                <p className="portfolio-education-muted">Course details are not available yet.</p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="portfolio-education-empty">Coursework details are not available yet.</p>
      )}
    </section>
  );
}
