'use client';

import { ArrowUpRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { navigationLinks } from '@/lib/site';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function MobileNavigation({ displayFontClassName }: { displayFontClassName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="portfolio-icon-button portfolio-menu-trigger"
          aria-label="Open navigation menu"
        >
          <Menu size={23} aria-hidden="true" />
        </button>
      </SheetTrigger>
      <SheetContent className={`${displayFontClassName} portfolio-mobile-panel`}>
        <SheetHeader>
          <SheetTitle className="portfolio-menu-title">Explore.</SheetTitle>
          <SheetDescription>A little about me and the things I build.</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="portfolio-mobile-links">
          {navigationLinks.map(({ label, href }, index) => (
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
  );
}
