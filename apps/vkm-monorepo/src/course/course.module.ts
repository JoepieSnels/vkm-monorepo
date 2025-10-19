import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from '@shared/shared/Infrastructure/schemas/course.shema';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseRepository } from '@shared/shared/Infrastructure/repositories/course.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
})
export class CourseModule {}
