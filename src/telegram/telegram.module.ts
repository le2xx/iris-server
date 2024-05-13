import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './telegram-config.factory';
import { RssAddScene } from './scenes/rss-add.scene';
import { TelegramController } from './telegram.controller';
import { RssTableService } from '../database/rss-table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssTable } from '../database/rss-table.entity';

@Module({
  imports: [
    TelegrafModule.forRootAsync(options()),
    TypeOrmModule.forFeature([RssTable]),
  ],
  exports: [TypeOrmModule],
  providers: [TelegramController, RssTableService, RssAddScene],
})
export class TelegramModule {}
