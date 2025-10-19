import { CourseEntity } from '../../Domain/entities/course.domain';
export interface ICourseRepository {
  findAll(): Promise<CourseEntity[]>;
  findById(id: string): Promise<CourseEntity | null>;
}
