import HomePage from '@/features/home/pages/HomePage';
import { createPageMetadata, homepageDescription, homepageTitle } from '@/lib/metadata';
import { homepageStructuredData, serializeStructuredData } from '@/lib/structured-data';

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
