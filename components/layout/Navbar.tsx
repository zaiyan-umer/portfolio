'use client';

import { ArrowUpRight, Menu, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useToggleTheme } from '@/store/theme.store';
import {
  Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader,
  SheetTitle, SheetTrigger,
} from '@/components/ui/sheet';

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Education', href: '/education' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar({ displayFontClassName }: { displayFontClassName: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleTheme = useToggleTheme();

  return (
    <header className="portfolio-header">
      <nav aria-label="Main navigation" className="portfolio-container portfolio-nav">
        <Link href="/" className="portfolio-wordmark" aria-label="Zaiyan Umer — home">
          Zaiyan Umer<span aria-hidden="true">.</span>
        </Link>
        <div className="portfolio-nav-actions">
          <ul className="portfolio-desktop-links">
            {links.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={label === 'Contact' ? 'portfolio-nav-contact' : 'portfolio-nav-link'}
                  aria-current={href === pathname ? 'page' : undefined}
                >
                  {label}{label === 'Contact' ? <ArrowUpRight size={14} aria-hidden="true" /> : null}
                </Link>
              </li>
            ))}
          </ul>
          <button type="button" onClick={toggleTheme} className="portfolio-icon-button" aria-label="Toggle color theme">
            <Moon size={19} className="dark:hidden" aria-hidden="true" />
            <Sun size={19} className="hidden dark:block" aria-hidden="true" />
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button type="button" className="portfolio-icon-button portfolio-menu-trigger" aria-label="Open navigation menu">
                <Menu size={23} aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent className={`${displayFontClassName} portfolio-mobile-panel`}>
              <SheetHeader>
                <SheetTitle className="portfolio-menu-title">Explore.</SheetTitle>
                <SheetDescription>A little about me and the things I build.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="portfolio-mobile-links">
                {links.map(({ label, href }, index) => (
                  <SheetClose asChild key={label}>
                    <Link href={href} onClick={() => setOpen(false)}>
                      <span aria-hidden="true">0{index + 1}</span>
                      {label}
                      <ArrowUpRight size={20} aria-hidden="true" />
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <p className="portfolio-menu-note">Zaiyan Umer · Full-stack developer</p>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
