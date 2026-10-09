import 'server-only';
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
    _type: 'message',
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  });
}
