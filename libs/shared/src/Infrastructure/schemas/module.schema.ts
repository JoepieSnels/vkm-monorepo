// libs/shared/src/Infrastructure/schemas/module.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CourseDb } from './course.shema';
import { TeacherDb } from './teacher.schema';

export type ModuleDocument = ModuleDb & Document;

@Schema({ collection: 'modules' })
export class ModuleDb {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ec: number;

  @Prop({ required: true })
  nlqf: number;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: CourseDb; // 🔗 referentie naar Course

  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
  teacher: TeacherDb; // 🔗 referentie naar Teacher

  @Prop()
  description: string;
}

export const ModuleSchema = SchemaFactory.createForClass(ModuleDb);
