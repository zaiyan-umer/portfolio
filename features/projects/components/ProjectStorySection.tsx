import type { ProjectStoryKey } from '@/features/projects/types';

type Props = { section: { key: ProjectStoryKey; title: string; paragraphs: string[] } };

export default function ProjectStorySection({ section }: Props) {
  return (
    <section
      aria-labelledby={`project-${section.key}-heading`}
      className={`portfolio-project-story-section portfolio-project-story-${section.key}`}
    >
      <h2 id={`project-${section.key}-heading`}>{section.title}</h2>
      <div className="portfolio-project-story-copy">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
