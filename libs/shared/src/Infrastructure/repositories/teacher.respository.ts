import { ITeacherRepository } from '@shared/shared/DomainServices/repositories/teacher.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeacherEntity } from '@shared/shared/Domain/entities/teacher.domain';
import { TeacherDocument } from '../schemas/teacher.schema';
import { CourseEntity } from '@shared/shared/Domain/entities/course.domain';
@Injectable()
export class TeacherRepository implements ITeacherRepository {
  constructor(
    @InjectModel('Teacher') private readonly model: Model<TeacherDocument>,
  ) {}
  async findAll(): Promise<TeacherEntity[]> {
    type PopulatedTeacher = {
      _id: any;
      name: string;
      email: string;
      course: {
        _id: any;
        name: string;
        location: string;
      };
    };

    const teachers = (await this.model
      .find()
      .lean()
      .populate('course')
      .exec()) as unknown as PopulatedTeacher[];

    if (!teachers) return [];
    const courses = teachers.map((t) => t.course);
    return teachers.map(
      (t) =>
        new TeacherEntity(
          t._id.toString(),
          t.name,
          t.email,
          new CourseEntity(
            t.course._id.toString(),
            t.course.name,
            t.course.location,
          ),
        ),
    );
  }
  async findById(id: string): Promise<TeacherEntity | null> {
    type PopulatedTeacher = {
      _id: any;
      name: string;
      email: string;
      course: {
        _id: any;
        name: string;
        location: string;
      };
    };
    const teacher = (await this.model
      .findById(id)
      .lean()
      .populate('course')
      .exec()) as unknown as PopulatedTeacher;

    if (!teacher) return null;
    const course = new CourseEntity(
      teacher.course._id.toString(),
      teacher.course.name,
      teacher.course.location,
    );

    return new TeacherEntity(
      teacher._id.toString(),
      teacher.name,
      teacher.email,
      course,
    );
  }
}
