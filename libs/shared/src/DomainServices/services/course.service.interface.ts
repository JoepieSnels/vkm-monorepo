import { CourseEntity } from '../../Domain/entities/course.domain';

export interface ICourseService {
  getAllCourses(): Promise<CourseEntity[]>;
  getCourseById(id: string): Promise<CourseEntity | null>;
}
