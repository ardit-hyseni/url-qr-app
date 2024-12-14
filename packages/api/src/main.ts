import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import { AppModule } from './modules/app.module';
import config from 'config';

const { settings } = config;

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create(AppModule);

  app.use(cors());

  await app.listen(settings.port, settings.host);
}
bootstrap();
