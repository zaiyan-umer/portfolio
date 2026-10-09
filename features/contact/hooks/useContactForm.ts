'use client';

import { useRef, useState, type FormEvent } from 'react';
import { validate } from '@/features/contact/lib/validation';
import type { FormValues, FormErrors, ContactStatus } from '@/features/contact/types';

const emptyValues: FormValues = { name: '', email: '', message: '' };

export function useContactForm() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<ContactStatus>({ kind: 'idle', message: '' });
  const formRef = useRef<HTMLFormElement>(null);
  const inFlight = useRef(false);
  const pending = status.kind === 'pending';

  function update(field: keyof FormValues, value: string) {
    if (inFlight.current) return;
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
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
    const firstInvalid = (['name', 'email', 'message'] as const).find((field) => nextErrors[field]);
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
      const payload = result && typeof result === 'object' ? (result as Record<string, unknown>) : null;
      if (response.ok && payload?.success === true) {
        setValues(emptyValues);
        setErrors({});
        setStatus({ kind: 'success', message: 'Message received. Thanks for reaching out.' });
      } else {
        const message = typeof payload?.error === 'string' && payload.error.trim() ? payload.error : '';
        setStatus({
          kind: 'error',
          message:
            response.status === 429
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

  return { values, errors, status, formRef, pending, update, handleSubmit };
}
