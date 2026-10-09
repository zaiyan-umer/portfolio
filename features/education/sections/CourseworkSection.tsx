import { CourseWork } from '@/features/education/sections/CourseWork';
import { getCoursework } from '@/features/education/server/data';

export default async function CourseworkSection() {
  return <CourseWork data={await getCoursework()} />;
}
