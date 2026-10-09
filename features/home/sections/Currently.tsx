import Link from 'next/link';
import { PortableText, type PortableTextComponents, type PortableTextMarkComponentProps } from 'next-sanity';
import { currentlyLink } from '@/features/home/lib/currently';
import type { CurrentlyNoteLink, CurrentlySnapshot } from '@/features/home/types';

function NoteLink({ children, value }: PortableTextMarkComponentProps<CurrentlyNoteLink>) {
  const href = currentlyLink(value?.href);
  if (!href) return <>{children}</>;
  if (href.startsWith('/')) return <Link href={href} className="portfolio-currently-link">{children}</Link>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="portfolio-currently-link">
      {children}<span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

const noteComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p><span className="portfolio-currently-highlight">{children}</span></p>
    ),
  },
  marks: { link: NoteLink },
};

export function Currently({ data }: { data: CurrentlySnapshot }) {
  if (!data.entries.length) return null;

  return (
    <section id="currently" aria-labelledby="currently-heading" className="portfolio-profile-section portfolio-currently-section portfolio-container">
      <h2 id="currently-heading" className="portfolio-currently-heading">
        <span aria-hidden="true" className="portfolio-eyebrow">05 / </span>Currently
      </h2>
      <ul className="portfolio-currently-notes">
        {data.entries.map((entry) => (
          <li key={entry.key} className="portfolio-currently-entry">
            <div className="portfolio-currently-note"><PortableText value={entry.note} components={noteComponents} /></div>
            {entry.description ? <p className="portfolio-currently-description">{entry.description}</p> : null}
          </li>
        ))}
      </ul>
      {data.updatedAt ? (
        <p className="portfolio-currently-updated">Updated <time dateTime={data.updatedAt.dateTime}>{data.updatedAt.label}</time></p>
      ) : null}
    </section>
  );
}
