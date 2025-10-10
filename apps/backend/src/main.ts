import { NestFactory } from '@nestjs/core';
import { BackendModule } from './backend.module';

async function bootstrap() {
  const app = await NestFactory.create(BackendModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Backend running on http://localhost:3000`);
}
bootstrap();
