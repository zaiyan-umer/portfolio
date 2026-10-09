import { ArrowUpRight } from 'lucide-react';
import { contactLinks, siteContact } from '@/lib/site';
import { cn } from '@/lib/utils';
import { ContactForm } from '@/features/contact/components/ContactForm';

export default function ContactSection({ className, sectionNumber = '05' }: { className?: string; sectionNumber?: '05' | '06' }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={cn('portfolio-profile-section portfolio-container', className)}
    >
      <div className="portfolio-contact-grid">
        <div className="portfolio-contact-invitation">
          <div className="portfolio-section-heading">
            <div>
              <p className="portfolio-eyebrow">
                <span aria-hidden="true">{sectionNumber} / </span>Contact
              </p>
              <h2 id="contact-heading">Let’s talk.</h2>
            </div>
          </div>
          <p>Have a role, project, or question in mind? Send me a message.</p>
          <a className="portfolio-contact-email" href={`mailto:${siteContact.email}`}>
            {siteContact.email}
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <ul className="portfolio-contact-links" aria-label="Connect directly">
            {contactLinks
              .filter((link) => link.external)
              .map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
