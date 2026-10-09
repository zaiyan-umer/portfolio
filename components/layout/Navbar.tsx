'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationLinks } from '@/lib/site';
import MobileNavigation from '@/components/layout/MobileNavigation';
import ThemeToggle from '@/features/theme/components/ThemeToggle';

export default function Navbar({ displayFontClassName }: { displayFontClassName: string }) {
  const pathname = usePathname();

  return (
    <header className="portfolio-header">
      <nav aria-label="Main navigation" className="portfolio-container portfolio-nav">
        <Link href="/" className="portfolio-wordmark" aria-label="Zaiyan Umer — home">
          Zaiyan Umer<span aria-hidden="true">.</span>
        </Link>
        <div className="portfolio-nav-actions">
          <ul className="portfolio-desktop-links">
            {navigationLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={label === 'Contact' ? 'portfolio-nav-contact' : 'portfolio-nav-link'}
                  aria-current={href === pathname ? 'page' : undefined}
                >
                  {label}
                  {label === 'Contact' ? <ArrowUpRight size={14} aria-hidden="true" /> : null}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <MobileNavigation displayFontClassName={displayFontClassName} />
        </div>
      </nav>
    </header>
  );
}
