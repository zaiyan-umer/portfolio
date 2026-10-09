import { Suspense } from 'react';
import CourseworkSection from '@/features/education/sections/CourseworkSection';
import CertificationsSection from '@/features/education/sections/CertificationsSection';
import GithubActivitySection from '@/features/education/sections/GithubActivitySection';
import SectionLoading from '@/features/education/components/SectionLoading';

export default function EducationPage() {
  return (
    <main className="portfolio-education-page portfolio-container">
      <header className="portfolio-work-heading">
        <h1>Education &amp; certifications</h1>
        <p>Coursework, certifications, and ongoing activity.</p>
      </header>
      <div className="portfolio-education-sections">
        <Suspense fallback={<SectionLoading label="coursework" />}>
          <CourseworkSection />
        </Suspense>
        <Suspense fallback={<SectionLoading label="certifications" />}>
          <CertificationsSection />
        </Suspense>
        <GithubActivitySection />
      </div>
    </main>
  );
}
