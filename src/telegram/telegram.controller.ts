import { Command, Help, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import {
  helpTemplate,
  rssItemTemplate,
  startTemplate,
} from './telegram.templates';
import { telegramCommandsList, rssList } from './telegram.mock';
import { TelegramCommands } from './telegram.models';
import { SceneContext } from 'telegraf/scenes';

@Update()
export class TelegramController {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.replyWithHTML(startTemplate(ctx.from.first_name));
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.replyWithHTML(helpTemplate(telegramCommandsList));
  }

  @Command(TelegramCommands.rss_add)
  async rssAdd(ctx: SceneContext) {
    await ctx.scene.enter(TelegramCommands.rss_add);
  }

  @Command(TelegramCommands.rss_list)
  async rssList(ctx: Context) {
    await ctx.replyWithHTML(
      rssList.map((item) => rssItemTemplate(item)).join('\n'),
    );
  }

  // @On('text')
  // async getMessage(@Message('text') text: string) {
  //   console.log(text);
  // }
}
