// libs/shared/src/Domain/entities/module.domain.ts
import { CourseEntity } from './course.domain';
import { TeacherEntity } from './teacher.domain';

export class ModuleEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly ec: number,
    public readonly nlqf: number,
    public readonly description: string,
    public readonly course: CourseEntity | null,
    public readonly teacher: TeacherEntity | null,
  ) {}
}
