import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RssController } from './rss/rss.controller';
import { RssService } from './rss/rss.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }), ScheduleModule.forRoot()],
  controllers: [AppController, RssController],
  providers: [AppService, RssService],
})
export class AppModule {}
