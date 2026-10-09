import { redirect } from 'next/navigation';
import { githubRepositoriesUrl } from '@/lib/site';

export default function RepositoriesPage() {
  redirect(githubRepositoriesUrl);
}
