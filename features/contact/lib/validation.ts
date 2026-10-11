import type { FormValues, FormErrors } from '@/features/contact/types';
import { contactLimits } from '@/features/contact/lib/limits';

export function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length > contactLimits.name) errors.name = 'Please keep your name within 100 characters.';
  if (!values.email.trim()) errors.email = 'Please enter your email.';
  else if (values.email.trim().length > contactLimits.email) errors.email = 'Please keep your email within 254 characters.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';
  if (!values.message.trim()) errors.message = 'Please enter a message.';
  else if (values.message.trim().length > contactLimits.message) errors.message = 'Please keep your message within 5,000 characters.';
  return errors;
}
