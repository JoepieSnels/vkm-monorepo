import { Injectable } from '@nestjs/common';
import { CourseEntity } from '@shared/shared/Domain/entities/course.domain';
import { CourseRepository } from '@shared/shared/Infrastructure/repositories/course.repository';
import { ICourseService } from '@shared/shared/DomainServices/services/course.service.interface';

@Injectable()
export class CourseService implements ICourseService {
  constructor(private readonly repository: CourseRepository) {}
  async getAllCourses(): Promise<CourseEntity[]> {
    return this.repository.findAll();
  }
  async getCourseById(id: string): Promise<CourseEntity | null> {
    return this.repository.findById(id);
  }
}
