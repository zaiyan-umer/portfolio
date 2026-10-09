import 'server-only';
import { sanityFetch } from '@/sanity/lib/live';
import { getCertificationsQuery, getCoursesQuery } from '@/sanity/lib/queries';
import type { CertificationData, CourseCategoryData } from '@/features/education/types';

export async function getCoursework() {
  const { data } = await sanityFetch({ query: getCoursesQuery });
  return data as CourseCategoryData[] | null;
}

export async function getCertifications() {
  const { data } = await sanityFetch({ query: getCertificationsQuery });
  return data as CertificationData[] | null;
}
