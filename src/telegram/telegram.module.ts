import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './telegram-config.factory';
import { TelegramService } from './telegram.service';

@Module({
  imports: [TelegrafModule.forRootAsync(options())],
  providers: [TelegramService],
})
export class TelegramModule {}
