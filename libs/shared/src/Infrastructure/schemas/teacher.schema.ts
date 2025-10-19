import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CourseDb } from './course.shema';

export type TeacherDocument = TeacherDb & Document;
@Schema({ collection: 'teachers' })
export class TeacherDb {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: CourseDb; // 🔗 referentie naar Course
}

export const TeacherSchema = SchemaFactory.createForClass(TeacherDb);
