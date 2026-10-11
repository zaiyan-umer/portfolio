import 'server-only';
import { randomUUID } from 'node:crypto';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';
import type { FormValues } from '@/features/contact/types';

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export function createMessage({ name, email, message }: FormValues) {
  return writeClient.create({
    // Sanity requires authentication to read dotted document-ID paths.
    _id: `contactMessages.${randomUUID()}`,
    _type: 'message',
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
    read: false,
  });
}
