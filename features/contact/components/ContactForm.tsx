'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContactForm } from '@/features/contact/hooks/useContactForm';

export function ContactForm() {
  const { values, errors, status, formRef, pending, update, handleSubmit } = useContactForm();

  return (
    <div className="portfolio-contact-panel">
      <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Send a message" aria-busy={pending}>
        <div className="portfolio-contact-fields">
          <div className="portfolio-contact-field">
            <label htmlFor="contact-name">
              Name <span className="portfolio-required">(required)</span>
            </label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              value={values.name}
              disabled={pending}
              onChange={(event) => update('name', event.target.value)}
              className="portfolio-form-control"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {errors.name ? (
              <p id="contact-name-error" className="portfolio-field-error">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="portfolio-contact-field">
            <label htmlFor="contact-email">
              Email <span className="portfolio-required">(required)</span>
            </label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              disabled={pending}
              onChange={(event) => update('email', event.target.value)}
              className="portfolio-form-control"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email ? (
              <p id="contact-email-error" className="portfolio-field-error">
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className="portfolio-contact-field portfolio-contact-message">
            <label htmlFor="contact-message">
              Message <span className="portfolio-required">(required)</span>
            </label>
            <Textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={values.message}
              disabled={pending}
              onChange={(event) => update('message', event.target.value)}
              className="portfolio-form-control"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            {errors.message ? (
              <p id="contact-message-error" className="portfolio-field-error">
                {errors.message}
              </p>
            ) : null}
          </div>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="portfolio-button portfolio-button-primary portfolio-contact-submit"
        >
          {pending ? 'Sending…' : 'Send message'}
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </form>
      <p
        className={cn('portfolio-contact-status', status.kind === 'error' && 'portfolio-field-error')}
        role={status.kind === 'error' ? 'alert' : 'status'}
        aria-live={status.kind === 'error' ? 'assertive' : 'polite'}
        aria-atomic="true"
      >
        {status.message}
      </p>
    </div>
  );
}
