import { getHomeData } from '@/features/home/server/data';
import ContactSection from '@/features/contact/sections/ContactSection';
import AboutMe from '@/features/home/sections/AboutMe';
import Experience from '@/features/home/sections/Experience';
import Footer from '@/components/layout/Footer';
import Hero from '@/features/home/sections/Hero';
import SelectedProjects from '@/features/projects/sections/SelectedProjects';
import type { ProjectSummary } from '@/features/projects/types';
import { TechStack } from '@/features/home/sections/TechStack';
import { Currently } from '@/features/home/sections/Currently';
import { normalizeCurrently } from '@/features/home/lib/currently';

export default async function HomePage() {
  const { aboutMeData, experienceData, techStackData, projectsData, currentlyData } = await getHomeData();
  const currently = normalizeCurrently(currentlyData);

  return (
    <main className="content relative">
      <Hero />
      <SelectedProjects projects={projectsData as ProjectSummary[] | null} />
      <AboutMe data={aboutMeData} />
      <Experience data={experienceData} />
      <TechStack data={techStackData} />
      <Currently data={currently} />
      <ContactSection sectionNumber={currently.entries.length ? '06' : '05'} />
      <Footer />
    </main>
  );
}
