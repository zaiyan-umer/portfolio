import { groq } from 'next-sanity'

// Sitemap discovery is intentionally limited to published featured projects.
export const projectSitemapQuery = groq`
  *[_type == "project" && featured == true && !(_id in path("drafts.**"))]
    | order(order asc, publishedAt desc) { slug, _updatedAt }
`

// Get all projects
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    thumbnail,
    githubUrl,
    liveUrl,
    techStack,
    featured,
    publishedAt,
    order
  }
`

// Get featured projects
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    thumbnail,
    githubUrl,
    liveUrl,
    techStack,
    publishedAt,
    order
  }
`

// Get single project
export const projectQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    thumbnail,
    githubUrl,
    liveUrl,
    techStack,
    overview,
    contribution,
    technicalNotes,
    publishedAt,
    order
  }
`

// Get about me
export const getAboutMeQuery = groq`
  *[_type == "aboutMe"][0] {
    paragraphs,
    highlights
  }
`

// Get the current notes singleton, retaining legacy fields for read compatibility
export const getCurrentlyQuery = groq`
  *[_type == "currently" && _id == "currently"][0] {
    updatedAt,
    entries[] {
      _key,
      note[] { _key, _type, style, listItem, children[] { _key, _type, text, marks }, markDefs[] { _key, _type, href } },
      description,
      title,
      href
    }
  }
`

// Get experiences
export const getExperienceQuery = groq`
  *[_type == "experience"] | order(order asc) {
    _id,
    company,
    role,
    startDate,
    endDate,
    location,
    summary,
    bullets,
    tags,
    link
  }
`

// Get certifications
export const getCertificationsQuery = groq`
  *[_type == "certification"] | order(order asc) {
    _id,
    title,
    issuedBy,
    img,
    issuedAt,
    credentialId,
    link,
    tags
  }
`

// Get courses
export const getCoursesQuery = groq`
  *[_type == "courseCategory"] | order(order asc) {
    _id,
    categoryKey,
    title,
    courses
  }
`

// Get tech stack
export const getTechStackQuery = groq`
  *[_type == "techStack"] | order(order asc) {
    _id,
    key,
    title,
    href,
    categories,
    theme
  }
`
