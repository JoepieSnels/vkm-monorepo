import { Injectable } from '@nestjs/common';
import { TeacherEntity } from '@shared/shared/Domain/entities/teacher.domain';
import { TeacherRepository } from '@shared/shared/Infrastructure/repositories/teacher.respository';
import { ITeacherService } from '@shared/shared/DomainServices/services/teacher.service.interface';

@Injectable()
export class TeacherService implements ITeacherService {
  constructor(private readonly repository: TeacherRepository) {}

  async getAllTeachers(): Promise<TeacherEntity[]> {
    return this.repository.findAll();
  }

  async getTeacherById(id: string): Promise<TeacherEntity | null> {
    return this.repository.findById(id);
  }
}
