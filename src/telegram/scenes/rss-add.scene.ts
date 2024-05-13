import { Injectable } from '@nestjs/common';
import { Ctx, Message, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/scenes';
import { RssItem, TelegramCommands } from '../telegram.models';

enum AddRssState {
  name = 'name',
  url = 'url',
}

@Injectable()
@Scene(TelegramCommands.rss_add)
export class RssAddScene {
  private state = AddRssState.name;
  private result: RssItem = { name: '', url: '' };

  @SceneEnter()
  async unlinkEnter(@Ctx() ctx: SceneContext) {
    await ctx.reply('Введите название rss');
  }

  @On('text')
  async getMessage(@Ctx() ctx: SceneContext, @Message('text') text: string) {
    switch (this.state) {
      case AddRssState.name:
        await this.addName(ctx, text);
        break;
      case AddRssState.url:
        await this.addUrl(ctx, text);
        break;
    }
    console.log(this.state, this.result);
  }

  private async addName(ctx: SceneContext, text: string) {
    const nameRegExp = /[\w]/;
    if (nameRegExp.test(text)) {
      this.result.name = text;
      this.state = AddRssState.url;
      await ctx.reply('Введите url rss');
      return;
    }
    await ctx.reply('Имя не корректно');
  }

  private async addUrl(ctx: SceneContext, text: string) {
    const urlRegExp = /^(ftp|http|https):\/\/[^ "]+$/;
    if (urlRegExp.test(text)) {
      this.result.url = text;
      await ctx.reply('Принято');
      await ctx.scene.leave();
      this.state = AddRssState.name;
      return;
    }
    await ctx.reply('Url не корректный');
  }
}
