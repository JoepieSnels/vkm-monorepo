import { ICourseRepository } from '@shared/shared/DomainServices/repositories/course.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseEntity } from '@shared/shared/Domain/entities/course.domain';
import { CourseDocument } from '../schemas/course.shema';

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(
    @InjectModel('Course') private readonly model: Model<CourseDocument>,
  ) {}

  async findAll(): Promise<CourseEntity[]> {
    const courses = await this.model.find().lean().exec();
    return courses.map(
      (c) => new CourseEntity(c._id.toString(), c.name, c.location),
    );
  }

  async findById(id: string): Promise<CourseEntity | null> {
    console.log('Finding course by ID:', id);
    const c = await this.model.findById(id).lean().exec();
    if (!c) return null;
    console.log('Found course:', c.name, c.location);

    return new CourseEntity(c._id.toString(), c.name, c.location);
  }
}
