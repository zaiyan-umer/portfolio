import { Suspense } from "react";
import ContributionCalendar from "@/components/sections/ContributionCalendar";
import { CourseWork, Certifications } from "@/components/sections/CourseWork";
import { sanityFetch } from "@/sanity/lib/live";
import { getCertificationsQuery, getCoursesQuery } from "@/lib/sanity.queries";

export default async function EducationPage() {
  const [
    { data: coursesData },
    { data: certificationsData }
  ] = await Promise.all([
    sanityFetch({ query: getCoursesQuery }),
    sanityFetch({ query: getCertificationsQuery })
  ]);

  return (
    <main className="layout-standard pt-8 pb-20">
      <header className="mb-10">
        <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
          Education & Certifications
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl">
          Coursework, certifications, and ongoing activity.
        </p>
      </header>

      <div className="space-y-12">
        <Suspense fallback={<div className="h-36 w-full rounded-2xl border border-neutral-200 bg-neutral-100/50 animate-pulse dark:border-neutral-800 dark:bg-neutral-900/50" />}>
          <ContributionCalendar className="mx-auto md:w-fit" />
        </Suspense>
        <CourseWork data={coursesData} />
        <Certifications data={certificationsData} className="mt-8" />
      </div>
    </main>
  );
}
