export type Technology = {
  id: string;
  key: string;
  title: string;
  href: string | null;
  themed: boolean;
};

const groupNames = ['Frontend', 'Backend & Data', 'Languages', 'Tools & Deployment', 'Other tools'] as const;
type GroupName = typeof groupNames[number];
export type TechnologyGroup = { name: GroupName; technologies: Technology[] };

const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';
const languageKeys = new Set(['typescript', 'js', 'javascript', 'python', 'c', 'c++']);
const backendKeys = new Set(['nodejs', 'express', 'django', 'socket', 'postgresql', 'mongodb', 'redis']);
const frontendKeys = new Set(['react', 'nextjs', 'nextjs2', 'tailwindcss', 'motion']);
const toolKeys = new Set(['git', 'docker', 'vercel']);

function groupFor(key: string, categories: Set<string>): GroupName {
  const has = (...values: string[]) => values.some(value => categories.has(value));
  if (has('language', 'languages') || languageKeys.has(key)) return 'Languages';
  if (has('backend', 'runtime environment', 'database', 'cache', 'realtime') || backendKeys.has(key)) return 'Backend & Data';
  if (has('frontend', 'ui library', 'animation') || frontendKeys.has(key)) return 'Frontend';
  if (has('tools', 'version control', 'containerization', 'deployment', 'hosting') || toolKeys.has(key)) return 'Tools & Deployment';
  return 'Other tools';
}

function externalUrl(value: unknown): string | null {
  const href = text(value);
  try {
    const url = new URL(href);
    return url.protocol === 'https:' || url.protocol === 'http:' ? href : null;
  } catch {
    return null;
  }
}

export function groupTechnologies(data: unknown): TechnologyGroup[] {
  const groups: TechnologyGroup[] = groupNames.map(name => ({ name, technologies: [] }));
  if (!Array.isArray(data)) return [];

  data.forEach((value, index) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return;
    const record = value as Record<string, unknown>;
    const title = text(record.title);
    if (!title) return;
    const key = text(record.key);
    const categories = new Set<string>(Array.isArray(record.categories)
      ? record.categories.map(category => text(category).toLowerCase()).filter(Boolean)
      : []);
    const group = groups.find(group => group.name === groupFor(key.toLowerCase(), categories));
    group?.technologies.push({
      id: text(record._id) || `${key || title}-${index}`,
      key, title, href: externalUrl(record.href), themed: record.theme === true,
    });
  });

  return groups.filter(group => group.technologies.length > 0);
}
