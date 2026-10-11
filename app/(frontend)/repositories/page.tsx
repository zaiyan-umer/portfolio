import { redirect } from 'next/navigation';
import { githubRepositoriesUrl } from '@/lib/site';

// This route redirects instead of rendering an instant-navigation destination.
export const instant = false;

export default function RepositoriesPage() {
  redirect(githubRepositoriesUrl);
}
