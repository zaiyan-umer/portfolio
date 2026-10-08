import { ContactForm } from "@/components/sections/ContactForm";
import AboutMe from "@/components/sections/AboutMe";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";
import Hero from '@/components/sections/Hero';
import SelectedProjects from '@/components/sections/SelectedProjects';
import type { ProjectSummary } from '@/lib/project.types';
import { TechStack } from "@/components/ui/tech-stack";
import { Separator } from "@/components/ui/separator";
import { sanityFetch } from "@/sanity/lib/live";
import { featuredProjectsQuery, getAboutMeQuery, getExperienceQuery, getTechStackQuery } from "@/lib/sanity.queries";

export default async function Home() {
  const [
    { data: aboutMeData },
    { data: experienceData },
    { data: techStackData },
    { data: projectsData },
  ] = await Promise.all([
    sanityFetch({ query: getAboutMeQuery }),
    sanityFetch({ query: getExperienceQuery }),
    sanityFetch({ query: getTechStackQuery }),
    sanityFetch({ query: featuredProjectsQuery }),
  ]);

  return (
    <main className="content relative">
      <Hero />
      <SelectedProjects projects={projectsData as ProjectSummary[] | null} />
      <AboutMe data={aboutMeData} />
      <Experience data={experienceData} />
      <div className="mt-8 layout-standard">
        <Separator className='dark:bg-gray-300/20' />

        <TechStack data={techStackData} className='my-20' />

        <Separator className='dark:bg-gray-300/20' />

        <ContactForm className="pt-12" />
        <Footer />
      </div>
    </main>
  );
}
