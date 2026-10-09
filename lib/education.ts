export type CourseCategoryData = {
  _id?: string | null;
  categoryKey?: string | null;
  title?: string | null;
  courses?: (string | null)[] | null;
};

export type CertificationData = {
  _id?: string | null;
  title?: string | null;
  issuedBy?: string | null;
  img?: string | null;
  issuedAt?: string | null;
  credentialId?: string | null;
  link?: string | null;
  tags?: (string | null)[] | null;
};

export const educationText = (value: unknown): string => typeof value === 'string' ? value.trim() : '';

export function educationUrl(value: unknown): string | null {
  const href = educationText(value);
  if (!href) return null;
  try {
    const url = new URL(href);
    return (url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password ? href : null;
  } catch {
    return null;
  }
}

function records(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> =>
    item !== null && typeof item === 'object' && !Array.isArray(item)) : [];
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.map(educationText).filter(Boolean) : [];
}

export function educationCourses(value: unknown) {
  return records(value).map((record, index) => ({
    key: educationText(record._id) || `${educationText(record.categoryKey)}-${index}`,
    title: educationText(record.title),
    courses: strings(record.courses),
  })).filter(record => record.title || record.courses.length);
}

export function educationCertifications(value: unknown) {
  return records(value).map((record, index) => ({
    key: educationText(record._id) || `certification-${index}`,
    title: educationText(record.title),
    issuer: educationText(record.issuedBy),
    image: educationUrl(record.img),
    date: educationText(record.issuedAt),
    credentialId: educationText(record.credentialId),
    link: educationUrl(record.link),
    tags: strings(record.tags),
  })).filter(record => record.title || record.issuer || record.date || record.credentialId || record.link || record.tags.length);
}
