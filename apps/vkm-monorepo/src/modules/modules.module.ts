import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { ModuleRepository } from '@shared/shared/Infrastructure/repositories/module.repository';
import { ModuleSchema } from '@shared/shared/Infrastructure/schemas/module.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Module', schema: ModuleSchema }]),
  ],
  controllers: [ModulesController],
  providers: [ModulesService, ModuleRepository],
})
export class ModulesModule {}
