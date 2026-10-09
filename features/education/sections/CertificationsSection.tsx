import { Certifications } from '@/features/education/sections/Certifications';
import { getCertifications } from '@/features/education/server/data';

export default async function CertificationsSection() {
  return <Certifications data={await getCertifications()} />;
}
