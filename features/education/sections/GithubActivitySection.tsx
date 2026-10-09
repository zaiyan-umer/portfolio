import { Suspense } from 'react';
import ContributionCalendar from '@/features/education/components/ContributionCalendar';
import SectionLoading from '@/features/education/components/SectionLoading';

export default function GithubActivitySection() {
  return (
    <section aria-labelledby="activity-heading" className="portfolio-education-section portfolio-education-activity">
      <header className="portfolio-education-section-heading">
        <p className="portfolio-eyebrow">03 / GitHub activity</p>
        <h2 id="activity-heading">Putting learning into practice.</h2>
      </header>
      <Suspense fallback={<SectionLoading label="GitHub activity" />}>
        <ContributionCalendar />
      </Suspense>
    </section>
  );
}
