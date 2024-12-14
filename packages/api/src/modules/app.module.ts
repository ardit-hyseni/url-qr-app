import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';

@Module({
  imports: [ScheduleModule.forRoot(), UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
