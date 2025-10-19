import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseEntity } from '@shared/shared/Domain/entities/course.domain';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourses(): Promise<CourseEntity[]> {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string): Promise<CourseEntity | null> {
    return this.courseService.getCourseById(id);
  }
}
