import { TeacherEntity } from '../../Domain/entities/teacher.domain';

export interface ITeacherService {
  getAllTeachers(): Promise<TeacherEntity[]>;
  getTeacherById(id: string): Promise<TeacherEntity | null>;
}
