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

export type ContributionDay = { date: string; count: number };
export type GithubActivity =
  | { status: 'available'; weeks: ContributionDay[][]; total: number; start: string; end: string }
  | { status: 'unavailable' };
