import { Scenes, Telegraf } from 'telegraf';
import { Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { Injectable } from '@nestjs/common';

interface Context extends Scenes.SceneContext {}

@Update()
@Injectable()
export class TelegramService extends Telegraf<Context> {
  getData(): { message: string } {
    return { message: 'Welcome to server!' };
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.replyWithHTML(
      `<b>Привет, ${ctx.from.first_name} ${ctx.from.language_code}</b>`,
    );
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async onSticker(ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hearsHi(ctx: Context) {
    await ctx.reply('Hey there');
  }
}
