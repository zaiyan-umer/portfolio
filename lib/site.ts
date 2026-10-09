export const siteContact = {
  email: 'zaiyanumer6@gmail.com',
  github: 'https://github.com/zaiyan-umer',
  linkedin: 'https://www.linkedin.com/in/zaiyan-umer-935525324/',
} as const;

export const githubRepositoriesUrl = `${siteContact.github}?tab=repositories`;

export const contactLinks = [
  { label: 'Email', href: `mailto:${siteContact.email}`, external: false },
  { label: 'GitHub', href: siteContact.github, external: true },
  { label: 'LinkedIn', href: siteContact.linkedin, external: true },
] as const;
