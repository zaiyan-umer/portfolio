import { cn } from '@/lib/utils';

type AboutMeData = {
  paragraphs?: (string | null)[] | null;
  highlights?: ({ label?: string | null; value?: string | null } | null)[] | null;
};

export default function AboutMe({ data, className }: { data: AboutMeData | null; className?: string }) {
  const paragraphs = Array.isArray(data?.paragraphs)
    ? data.paragraphs.filter((paragraph): paragraph is string => typeof paragraph === 'string' && Boolean(paragraph.trim()))
    : [];
  const highlights = Array.isArray(data?.highlights)
    ? data.highlights.flatMap((highlight) => {
        if (typeof highlight?.label !== 'string' || typeof highlight.value !== 'string') return [];
        const label = highlight.label.trim();
        const value = highlight.value.trim();
        return label && value ? [{ label, value }] : [];
      })
    : [];

  if (!paragraphs.length && !highlights.length) return null;

  return (
    <section id="about" aria-labelledby="about-heading" className={cn('portfolio-profile-section portfolio-container', className)}>
      <div className="portfolio-section-heading">
        <div>
          <p className="portfolio-eyebrow"><span aria-hidden="true">02 / </span>About</p>
          <h2 id="about-heading">A little about me.</h2>
        </div>
      </div>
      <div className={cn('portfolio-about-grid', paragraphs.length > 0 && highlights.length > 0 && 'portfolio-about-grid-split')}>
        {paragraphs.length ? (
          <div className="portfolio-about-biography">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'portfolio-about-intro' : 'portfolio-about-paragraph'}>
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
        {highlights.length ? (
          <aside className="portfolio-about-facts" aria-labelledby="about-facts-heading">
            <svg className="portfolio-about-mark" width="55" height="24" viewBox="0 0 55 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M3 16C15 9 33 7 50 8M7 21c11-4 26-5 39-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h3 id="about-facts-heading" className="portfolio-eyebrow">A few details</h3>
            <dl>
              {highlights.map((highlight, index) => (
                <div key={`${highlight.label}-${index}`} className="portfolio-about-fact">
                  <dt>{highlight.label}</dt>
                  <dd>{highlight.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
