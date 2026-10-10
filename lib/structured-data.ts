import { siteContact, siteOrigin } from '@/lib/site';

export const homepageStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteOrigin}/#person`,
      name: 'Zaiyan Umer',
      url: siteOrigin,
      sameAs: [siteContact.github, siteContact.linkedin],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteOrigin}/#website`,
      name: 'Zaiyan Umer',
      url: siteOrigin,
      publisher: { '@id': `${siteOrigin}/#person` },
    },
  ],
};

export function serializeStructuredData(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
