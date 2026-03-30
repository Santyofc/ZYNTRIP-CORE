import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 4001);
  await app.listen(port);
  console.log(`Zyntrip workspace API scaffold listening on http://localhost:${port}`);
}

void bootstrap();
