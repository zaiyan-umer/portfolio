import type { PortableTextBlock } from 'next-sanity';

export type AboutMeData = {
  paragraphs?: (string | null)[] | null;
  highlights?: ({ label?: string | null; value?: string | null } | null)[] | null;
};

export type CurrentInterest = {
  key: string;
  note: CurrentlyNoteBlock[];
  description: string | null;
};

export type CurrentlyNoteLink = { _type: 'link'; _key: string; href: string };
export type CurrentlyNoteBlock = PortableTextBlock<
  CurrentlyNoteLink,
  { _type: 'span'; _key: string; text: string; marks: string[] },
  'normal'
>;

export type CurrentlySnapshot = {
  entries: CurrentInterest[];
  updatedAt: { dateTime: string; label: string } | null;
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
