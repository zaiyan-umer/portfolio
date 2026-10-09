export type AboutMeData = {
  paragraphs?: (string | null)[] | null;
  highlights?: ({ label?: string | null; value?: string | null } | null)[] | null;
};

export type ExperienceData = {
  _id?: string | null;
  company?: string | null;
  role?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  summary?: string | null;
  bullets?: (string | null)[] | null;
  tags?: (string | null)[] | null;
  link?: string | null;
};

export type Technology = {
  id: string;
  key: string;
  title: string;
  href: string | null;
  themed: boolean;
};

export type TechnologyGroupName = 'Frontend' | 'Backend & Data' | 'Languages' | 'Tools & Deployment' | 'Other tools';
export type TechnologyGroup = { name: TechnologyGroupName; technologies: Technology[] };
