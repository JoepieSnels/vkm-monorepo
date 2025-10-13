import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from '@shared/shared/Infrastructure/schemas/teacher.schema';
import { TeacherRepository } from '@shared/shared/Infrastructure/repositories/teacher.respository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
  ],
  providers: [TeacherService, TeacherRepository],
  controllers: [TeacherController],
})
export class TeacherModule {}
