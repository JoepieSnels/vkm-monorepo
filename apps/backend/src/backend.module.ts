import { Module } from '@nestjs/common';
import { BackendController } from './backend.controller';
import { BackendService } from './backend.service';
import { ModulesModule } from '../../vkm-monorepo/src/modules/modules.module';

@Module({
  imports: [ModulesModule],
  controllers: [BackendController],
  providers: [BackendService],
})
export class BackendModule {}
