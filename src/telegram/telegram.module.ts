import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './telegram-config.factory';
import { RssAddScene } from './scenes/rss-add.scene';
import { TelegramController } from './telegram.controller';
import { RssTableService } from '../database/rss-table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssList } from '../database/rss-table.entity';
import { RssListScene } from './scenes/rss-list.scene';
import { RssEditScene } from './scenes/rss-edit.scene';

@Module({
  imports: [
    TelegrafModule.forRootAsync(options()),
    TypeOrmModule.forFeature([RssList]),
  ],
  exports: [TypeOrmModule],
  providers: [
    TelegramController,
    RssTableService,
    RssAddScene,
    RssListScene,
    RssEditScene,
  ],
})
export class TelegramModule {}
