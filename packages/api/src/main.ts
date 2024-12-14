import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import { AppModule } from './modules/app.module';
import config from 'config';
import { ValidationPipe } from '@nestjs/common';

const { settings } = config;

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cors());

  await app.listen(settings.port, settings.host);
}
bootstrap();
