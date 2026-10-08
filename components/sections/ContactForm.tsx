'use client';

import { useRef, useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { contactLinks, siteContact } from '@/lib/site';
import { ArrowUpRight } from 'lucide-react';

type FormValues = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;
type Status = { kind: 'idle' | 'pending' | 'success' | 'error'; message: string };
const emptyValues: FormValues = { name: '', email: '', message: '' };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!values.message.trim()) errors.message = 'Please enter a message.';
  return errors;
}

export function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });
  const formRef = useRef<HTMLFormElement>(null);
  const inFlight = useRef(false);
  const pending = status.kind === 'pending';

  function update(field: keyof FormValues, value: string) {
    if (inFlight.current) return;
    setValues(previous => ({ ...previous, [field]: value }));
    setErrors(previous => {
      const next = { ...previous };
      delete next[field];
      return next;
    });
    setStatus({ kind: 'idle', message: '' });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (['name', 'email', 'message'] as const).find(field => nextErrors[field]);
    if (firstInvalid) {
      setStatus({ kind: 'idle', message: '' });
      formRef.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    inFlight.current = true;
    setStatus({ kind: 'pending', message: 'Sending your message…' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() }),
      });
      const result: unknown = await response.json();
      const payload = result && typeof result === 'object' ? result as Record<string, unknown> : null;
      if (response.ok && payload?.success === true) {
        setValues(emptyValues);
        setErrors({});
        setStatus({ kind: 'success', message: 'Message received. Thanks for reaching out.' });
      } else {
        const message = typeof payload?.error === 'string' && payload.error.trim() ? payload.error : '';
        setStatus({
          kind: 'error',
          message: response.status === 429
            ? 'Too many messages. Please try again in a minute, or email me directly.'
            : message || 'Your message could not be sent. Please try again, or email me directly.',
        });
      }
    } catch {
      setStatus({ kind: 'error', message: 'Your message could not be sent. Please try again, or email me directly.' });
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className={cn('portfolio-profile-section portfolio-container', className)}>
      <div className="portfolio-contact-grid">
        <div className="portfolio-contact-invitation">
          <div className="portfolio-section-heading">
            <div>
              <p className="portfolio-eyebrow"><span aria-hidden="true">05 / </span>Contact</p>
              <h2 id="contact-heading">Let’s talk.</h2>
            </div>
          </div>
          <p>Have a role, project, or question in mind? Send me a message.</p>
          <a className="portfolio-contact-email" href={`mailto:${siteContact.email}`}>{siteContact.email}<ArrowUpRight size={20} aria-hidden="true" /></a>
          <ul className="portfolio-contact-links" aria-label="Connect directly">
            {contactLinks.filter(link => link.external).map(link => (
              <li key={link.label}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a></li>
            ))}
          </ul>
        </div>
        <div className="portfolio-contact-panel">
          <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Send a message" aria-busy={pending}>
            <div className="portfolio-contact-fields">
              <div className="portfolio-contact-field">
                <label htmlFor="contact-name">Name <span className="portfolio-required">(required)</span></label>
                <Input id="contact-name" name="name" autoComplete="name" required value={values.name} disabled={pending}
                  onChange={event => update('name', event.target.value)} className="portfolio-form-control"
                  aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
                {errors.name ? <p id="contact-name-error" className="portfolio-field-error">{errors.name}</p> : null}
              </div>
              <div className="portfolio-contact-field">
                <label htmlFor="contact-email">Email <span className="portfolio-required">(required)</span></label>
                <Input id="contact-email" name="email" type="email" autoComplete="email" required value={values.email} disabled={pending}
                  onChange={event => update('email', event.target.value)} className="portfolio-form-control"
                  aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
                {errors.email ? <p id="contact-email-error" className="portfolio-field-error">{errors.email}</p> : null}
              </div>
              <div className="portfolio-contact-field portfolio-contact-message">
                <label htmlFor="contact-message">Message <span className="portfolio-required">(required)</span></label>
                <Textarea id="contact-message" name="message" required rows={5} value={values.message} disabled={pending}
                  onChange={event => update('message', event.target.value)} className="portfolio-form-control"
                  aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
                {errors.message ? <p id="contact-message-error" className="portfolio-field-error">{errors.message}</p> : null}
              </div>
            </div>
            <button type="submit" disabled={pending} className="portfolio-button portfolio-button-primary portfolio-contact-submit">
              {pending ? 'Sending…' : 'Send message'}<ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </form>
          <p className={cn('portfolio-contact-status', status.kind === 'error' && 'portfolio-field-error')}
            role={status.kind === 'error' ? 'alert' : 'status'} aria-live={status.kind === 'error' ? 'assertive' : 'polite'} aria-atomic="true">
            {status.message}
          </p>
        </div>
      </div>
    </section>
  );
}
