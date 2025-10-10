// libs/shared/src/Infrastructure/schemas/module.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModuleDocument = ModuleEntity & Document;

@Schema({ collection: 'modules' })
export class ModuleEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ec: number;

  @Prop({ required: true })
  nlqf: number;

  @Prop({ required: true })
  theme: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: string;
}

export const ModuleSchema = SchemaFactory.createForClass(ModuleEntity);
