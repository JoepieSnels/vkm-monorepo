import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModuleEntity } from '@shared/shared/Domain/entities/module.domain';
import { ModuleDocument } from '../schemas/module.schema';
import { IModuleRepository } from '@shared/shared/DomainServices/repositories/module.repository.interface';
import { CourseEntity } from '@shared/shared/Domain/entities/course.domain';
import { TeacherEntity } from '@shared/shared/Domain/entities/teacher.domain';

@Injectable()
export class ModuleRepository implements IModuleRepository {
  constructor(
    @InjectModel('Module') private readonly model: Model<ModuleDocument>,
  ) {}

  async findAll(): Promise<ModuleEntity[]> {
    type PopulatedModule = {
      _id: any;
      name: string;
      ec: number;
      nlqf: number;
      description?: string;
      course?: {
        _id: any;
        name: string;
        location: string;
      };
      teacher?: {
        _id: any;
        name: string;
        email: string;
        course?: {
          _id: any;
          name: string;
          location: string;
        };
      };
    };

    const modules = (await this.model
      .find()
      .populate('course')
      .populate({
        path: 'teacher', // module's teacher
        populate: { path: 'course' }, // teacher's course
      })
      .lean()
      .exec()) as unknown as PopulatedModule[];

    return modules.map((m) => {
      const course = m.course
        ? new CourseEntity(
            m.course._id.toString(),
            m.course.name,
            m.course.location,
          )
        : null;

      const teacher = m.teacher
        ? new TeacherEntity(
            m.teacher._id.toString(),
            m.teacher.name,
            m.teacher.email,
            new CourseEntity(
              m.teacher.course?._id.toString() ?? '',
              m.teacher.course?.name ?? '',
              m.teacher.course?.location ?? '',
            ),
          )
        : null;

      return new ModuleEntity(
        m._id.toString(),
        m.name,
        m.ec,
        m.nlqf,
        m.description ?? '',
        course,
        teacher,
      );
    });
  }

  async findById(id: string): Promise<ModuleEntity | null> {
    type PopulatedModule = {
      _id: any;
      name: string;
      ec: number;
      nlqf: number;
      description?: string;
      course?: {
        _id: any;
        name: string;
        location: string;
      };
      teacher?: {
        _id: any;
        name: string;
        email: string;
        course?: {
          _id: any;
          name: string;
          location: string;
        };
      };
    };
    const m = (await this.model
      .findById(id)
      .populate('course')
      .populate({
        path: 'teacher', // module's teacher
        populate: { path: 'course' }, // teacher's course
      })
      .lean()
      .exec()) as unknown as PopulatedModule;

    if (!m) return null;

    const course = m.course
      ? new CourseEntity(
          m.course._id.toString(),
          m.course.name,
          m.course.location,
        )
      : null;

    const teacher = m.teacher
      ? new TeacherEntity(
          m.teacher._id.toString(),
          m.teacher.name,
          m.teacher.email,
          new CourseEntity(
            m.teacher.course?._id.toString() ?? '',
            m.teacher.course?.name ?? '',
            m.teacher.course?.location ?? '',
          ),
        )
      : null;

    return new ModuleEntity(
      m._id.toString(),
      m.name,
      m.ec,
      m.nlqf,
      m.description ?? '',
      course,
      teacher,
    );
  }

  async create(data: Partial<ModuleEntity>): Promise<ModuleEntity> {
    const created = new this.model(data);
    await created.save();
    // Populeer de course en teacher zodat je er objecten van kunt maken
    const populated = await created.populate([
      'course',
      {
        path: 'teacher',
        populate: { path: 'course' },
      },
    ]);
    const m = populated.toObject() as unknown as {
      _id: any;
      name: string;
      ec: number;
      nlqf: number;
      description?: string;
      course?: { _id: any; name: string; location: string };
      teacher?: {
        _id: any;
        name: string;
        email: string;
        course?: { _id: any; name: string; location: string };
      };
    };

    // Maak CourseEntity object aan als course gepopulated is
    const course = m.course
      ? new CourseEntity(
          m.course._id.toString(),
          m.course.name,
          m.course.location,
        )
      : null;

    // Maak TeacherEntity object aan, met CourseEntity voor de teacher.course
    const teacher = m.teacher
      ? new TeacherEntity(
          m.teacher._id.toString(),
          m.teacher.name,
          m.teacher.email,
          m.teacher.course
            ? new CourseEntity(
                m.teacher.course._id.toString(),
                m.teacher.course.name,
                m.teacher.course.location,
              )
            : null,
        )
      : null;

    // Maak de ModuleEntity aan, met fallback voor description
    return new ModuleEntity(
      m._id.toString(),
      m.name,
      m.ec,
      m.nlqf,
      m.description ?? '', // fallback
      course,
      teacher,
    );
  }

  async update(
    id: string,
    data: Partial<ModuleEntity>,
  ): Promise<ModuleEntity | null> {
    const updated = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .lean()
      .exec();
    return updated as ModuleEntity | null;
  }

  async delete(id: string): Promise<ModuleEntity | null> {
    const deleted = await this.model.findByIdAndDelete(id).lean().exec();
    return deleted as ModuleEntity | null;
  }
}
