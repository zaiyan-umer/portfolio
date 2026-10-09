import 'server-only';
import { sanityFetch } from '@/sanity/lib/live';
import { featuredProjectsQuery, getAboutMeQuery, getExperienceQuery, getTechStackQuery } from '@/sanity/lib/queries';

export async function getHomeData() {
  const [{ data: aboutMeData }, { data: experienceData }, { data: techStackData }, { data: projectsData }] =
    await Promise.all([
      sanityFetch({ query: getAboutMeQuery }),
      sanityFetch({ query: getExperienceQuery }),
      sanityFetch({ query: getTechStackQuery }),
      sanityFetch({ query: featuredProjectsQuery }),
    ]);

  return { aboutMeData, experienceData, techStackData, projectsData };
}
