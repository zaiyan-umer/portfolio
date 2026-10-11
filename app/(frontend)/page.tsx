import HomePage from '@/features/home/pages/HomePage';
import { createPageMetadata, homepageDescription, homepageTitle } from '@/lib/metadata';
import { homepageStructuredData, serializeStructuredData } from '@/lib/structured-data';

// Keep the existing Sanity fetching path; this route can block on CMS reads.
export const instant = false;

export const metadata = createPageMetadata({
  title: homepageTitle,
  description: homepageDescription,
  path: '/',
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(homepageStructuredData) }}
      />
      <HomePage />
    </>
  );
}
