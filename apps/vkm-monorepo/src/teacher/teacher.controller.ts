import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherEntity } from '@shared/shared/Domain/entities/teacher.domain';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async getAllTeachers(): Promise<TeacherEntity[]> {
    return this.teacherService.getAllTeachers();
  }

  @Get(':id')
  async getTeacherById(@Param('id') id: string): Promise<TeacherEntity | null> {
    return this.teacherService.getTeacherById(id);
  }
}
