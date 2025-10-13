import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = CourseDb & Document;
@Schema({ collection: 'courses' })
export class CourseDb {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  location: string;
}
export const CourseSchema = SchemaFactory.createForClass(CourseDb);
