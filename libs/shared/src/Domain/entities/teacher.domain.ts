import { CourseEntity } from './course.domain';
export class TeacherEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly course: CourseEntity | null,
  ) {}
}
