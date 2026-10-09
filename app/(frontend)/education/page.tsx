import { Suspense } from 'react';
import ContributionCalendar from '@/components/sections/ContributionCalendar';
import { CourseWork, Certifications } from '@/components/sections/CourseWork';
import { sanityFetch } from '@/sanity/lib/live';
import { getCertificationsQuery, getCoursesQuery } from '@/lib/sanity.queries';

async function CourseworkContent() {
  const { data } = await sanityFetch({ query: getCoursesQuery });
  return <CourseWork data={data} />;
}

async function CertificationContent() {
  const { data } = await sanityFetch({ query: getCertificationsQuery });
  return <Certifications data={data} />;
}

function SectionLoading({ label }: { label: string }) {
  return <div className="portfolio-education-loading" role="status"><span>Loading {label}…</span><div aria-hidden="true" /></div>;
}

export default function EducationPage() {
  return (
    <main className="portfolio-education-page portfolio-container">
      <header className="portfolio-work-heading">
        <h1>Education &amp; certifications</h1>
        <p>Coursework, certifications, and ongoing activity.</p>
      </header>
      <div className="portfolio-education-sections">
        <Suspense fallback={<SectionLoading label="coursework" />}><CourseworkContent /></Suspense>
        <Suspense fallback={<SectionLoading label="certifications" />}><CertificationContent /></Suspense>
        <section aria-labelledby="activity-heading" className="portfolio-education-section portfolio-education-activity">
          <header className="portfolio-education-section-heading">
            <p className="portfolio-eyebrow">03 / GitHub activity</p>
            <h2 id="activity-heading">Putting learning into practice.</h2>
          </header>
          <Suspense fallback={<SectionLoading label="GitHub activity" />}><ContributionCalendar /></Suspense>
        </section>
      </div>
    </main>
  );
}
