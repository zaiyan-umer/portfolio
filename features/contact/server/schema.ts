import 'server-only';
import { z } from 'zod';
import { contactLimits } from '@/features/contact/lib/limits';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(contactLimits.name, 'Please keep your name within 100 characters.'),
  email: z.string().trim().max(contactLimits.email, 'Please keep your email within 254 characters.').email('Invalid email format'),
  message: z.string().trim().min(1, 'Message is required').max(contactLimits.message, 'Please keep your message within 5,000 characters.'),
});
