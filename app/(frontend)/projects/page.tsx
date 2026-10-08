import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { featuredProjectsQuery } from '@/lib/sanity.queries'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/imgUrl'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'



export default async function ProjectsPage() {
  'use cache';
  const projects = await client.fetch(featuredProjectsQuery)

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#0d1117] dark:text-white mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Featured Projects</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          In-depth case studies of projects I&apos;ve built
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project: any) => (
            <Card key={project._id} className="bg-white border-gray-200 dark:bg-[#161b22] dark:border-gray-800">
              <CardHeader>
                {project.thumbnail && (
                  <Image
                    src={urlFor(project.thumbnail).width(600).height(300).quality(90).url()}
                    alt={project.title}
                    width={600}
                    height={300}
                    unoptimized
                    className="rounded-lg mb-4"
                  />
                )}
                <CardTitle className="text-gray-900 dark:text-white">{project.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech: string) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              

              <CardFooter className="flex gap-4 mx-1">
                {project?.slug?.current && (
                    <Link
                    href={`/projects/${encodeURIComponent(project.slug.current)}`}
                    className="flex items-center gap-px text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors group"
                    >
                    Read more
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 duration-300" />
                    </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <Github size={20} />
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <ExternalLink size={20} />
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
