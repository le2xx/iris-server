import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './telegram-config.factory';
import { RssAddScene } from './scenes/rss-add.scene';
import { TelegramController } from './telegram.controller';

@Module({
  imports: [TelegrafModule.forRootAsync(options())],
  providers: [TelegramController, RssAddScene],
})
export class TelegramModule {}
