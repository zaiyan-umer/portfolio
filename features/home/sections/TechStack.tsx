import { cn } from '@/lib/utils';
import { groupTechnologies } from '@/features/home/lib/tech-stack';
import { TechnologyIcon } from '@/features/home/components/TechnologyIcon';

export function TechStack({ data, className }: { data: unknown; className?: string }) {
  const groups = groupTechnologies(data);
  if (!groups.length) return null;

  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className={cn('portfolio-profile-section portfolio-container', className)}
    >
      <div className="portfolio-section-heading">
        <div>
          <p className="portfolio-eyebrow">
            <span aria-hidden="true">04 / </span>Tech Stack
          </p>
          <h2 id="stack-heading">Tools I work with.</h2>
        </div>
      </div>
      <div className="portfolio-tech-groups">
        {groups.map((group) => (
          <div key={group.name} className="portfolio-tech-group">
            <h3>{group.name}</h3>
            <ul>
              {group.technologies.map((tech) => {
                const content = (
                  <>
                    <TechnologyIcon iconKey={tech.key} name={tech.title} themed={tech.themed} />
                    <span>{tech.title}</span>
                  </>
                );
                return (
                  <li key={tech.id}>
                    {tech.href ? (
                      <a href={tech.href} target="_blank" rel="noopener noreferrer" className="portfolio-tech-item">
                        {content}
                      </a>
                    ) : (
                      <span className="portfolio-tech-item">{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
