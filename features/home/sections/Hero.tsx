import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import NamePronunciation from '@/features/home/components/NamePronunciation';
import WorkspaceHoverScene from '@/features/home/components/WorkspaceHoverScene';
import WorkspaceIllustration from '@/features/home/components/WorkspaceIllustration';

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="portfolio-hero portfolio-container">
      <div className="portfolio-hero-copy">
        <p className="portfolio-eyebrow portfolio-enter">Hi, I’m</p>
        <h1 id="hero-heading" className="portfolio-hero-name portfolio-enter">
          <span>Zaiyan </span>
          <span className="portfolio-name-accent">
            Umer
            <span className="portfolio-name-period" aria-hidden="true">
              .
            </span>
          </span>
        </h1>
        <div className="portfolio-hero-description portfolio-enter">
          <p className="portfolio-hero-role">Full-stack developer</p>
          <p className="portfolio-hero-statement">
            I build web applications
            <br className="hidden sm:block" /> from interface to backend.
          </p>
        </div>
        <div className="portfolio-hero-actions portfolio-enter">
          <Link href="#work" className="portfolio-button portfolio-button-primary">
            View selected work <ArrowDown size={17} aria-hidden="true" />
          </Link>
          <Link href="#contact" className="portfolio-button portfolio-button-secondary">
            Get in touch <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <NamePronunciation />
      </div>
      <div className="portfolio-hero-art">
        <span className="portfolio-art-note" aria-hidden="true">
          A place for <span className="portfolio-art-note-highlight">ideas</span>
          <br />
          <span className="portfolio-art-note-highlight portfolio-art-note-highlight-coral">to become things.</span>
        </span>
        <WorkspaceHoverScene>
          <WorkspaceIllustration />
        </WorkspaceHoverScene>
        <span className="portfolio-art-caption" aria-hidden="true">
          a little corner of the internet
        </span>
      </div>
      <div className="portfolio-hero-bottom">
        <span>Thoughtfully built. Always learning.</span>
        <Link href="#work">
          Scroll to explore <ArrowDown size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
