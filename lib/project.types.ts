import type { urlFor } from '@/sanity/lib/imgUrl';

export interface ProjectSummary {
  _id: string;
  title?: string | null;
  slug?: { current?: string | null } | null;
  description?: string | null;
  thumbnail?: Parameters<typeof urlFor>[0] | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  techStack?: string[] | null;
}
