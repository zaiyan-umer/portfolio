import type { Metadata } from 'next';
import { siteOrigin } from '@/lib/site';

export const homepageTitle = 'Zaiyan Umer | Full-Stack Developer';
export const homepageDescription =
  'Zaiyan Umer is a full-stack developer based in Karachi, building web applications, AI workflows, and backend tools. Explore his projects and experience.';

export const socialPreview = {
  url: new URL('/opengraph-image', siteOrigin).href,
  width: 1200,
  height: 630,
  alt: 'Zaiyan Umer — Full-stack Developer — zaiyan.me',
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}

export function createPageMetadata({ title, description, path, noIndex = false }: PageMetadataOptions): Metadata {
  const url = path ? new URL(path, siteOrigin).href : undefined;

  return {
    title: { absolute: title },
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      ...(url ? { url } : {}),
      siteName: 'Zaiyan Umer',
      locale: 'en_US',
      type: 'website',
      images: [socialPreview],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialPreview],
    },
  };
}
