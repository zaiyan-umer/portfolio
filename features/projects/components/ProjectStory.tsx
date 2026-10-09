import { storyParagraphs } from '@/features/projects/lib/story';
import type { ProjectDetail } from '@/features/projects/types';
import ProjectStorySection from '@/features/projects/components/ProjectStorySection';

const storySections = [
  { key: 'overview', title: 'Overview' },
  { key: 'contribution', title: 'My contribution' },
  { key: 'technicalNotes', title: 'Technical notes' },
] as const;

export default function ProjectStory({ project }: { project: ProjectDetail }) {
  const sections = storySections
    .map((section) => ({ ...section, paragraphs: storyParagraphs(project[section.key]) }))
    .filter((section) => section.paragraphs.length > 0);

  if (!sections.length) return null;

  return (
    <div className="portfolio-project-story">
      {sections.map((section) => (
        <ProjectStorySection key={section.key} section={section} />
      ))}
    </div>
  );
}
