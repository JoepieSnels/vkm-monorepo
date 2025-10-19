import { TeacherEntity } from '@shared/shared/Domain/entities/teacher.domain';

export interface ITeacherRepository {
  findAll(): Promise<TeacherEntity[]>;
  findById(id: string): Promise<TeacherEntity | null>;
}
