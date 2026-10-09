import HomePage from '@/features/home/pages/HomePage';
import { createPageMetadata, homepageDescription, homepageTitle } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: homepageTitle,
  description: homepageDescription,
  path: '/',
});

export default HomePage;
