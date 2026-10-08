import Link from 'next/link';
import { cacheLife } from 'next/cache';
import { ArrowUp } from 'lucide-react';
import { contactLinks } from '@/lib/site';

async function copyrightYear() {
  'use cache';
  cacheLife('days');
  return new Date().getUTCFullYear();
}

const navigation = [
  { label: 'Work', href: '/projects' },
  { label: 'About', href: '/#about' },
  { label: 'Education', href: '/education' },
  { label: 'Contact', href: '/#contact' },
] as const;

export default async function Footer() {
  const year = await copyrightYear();

  return (
    <footer className="portfolio-footer portfolio-container">
      <div className="portfolio-footer-top">
        <Link href="/" className="portfolio-wordmark" aria-label="Zaiyan Umer — home">Zaiyan Umer<span aria-hidden="true">.</span></Link>
        <nav aria-label="Footer navigation">
          <ul className="portfolio-footer-links">{navigation.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
        </nav>
        <ul className="portfolio-footer-links" aria-label="Connect">
          {contactLinks.map(link => <li key={link.label}><a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined}>{link.label}</a></li>)}
        </ul>
      </div>
      <div className="portfolio-footer-bottom">
        <p>© {year} Zaiyan Umer. All rights reserved.</p>
        <a href="#main-content">Back to top<ArrowUp size={14} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
