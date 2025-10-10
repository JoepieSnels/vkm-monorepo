// apps/vkm-monorepo/src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesModule } from './modules/modules.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Hier maak je de databaseverbinding
    MongooseModule.forRoot('mongodb://localhost:27017/vkm-db'),
    ModulesModule, // jouw modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
