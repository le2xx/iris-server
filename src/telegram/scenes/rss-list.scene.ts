import { Injectable } from '@nestjs/common';
import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { TelegramCommands } from '../telegram.models';
import { SceneContext } from 'telegraf/scenes';
import { RssTableService } from '../../database/rss-table.service';
import { Markup } from 'telegraf';

Injectable();
@Scene(TelegramCommands.rss_list)
export class RssListScene {
  constructor(private rssTableService: RssTableService) {}

  @SceneEnter()
  async unlinkEnter(@Ctx() ctx: SceneContext) {
    this.rssTableService.getAllRss().subscribe((rssList) => {
      if (!rssList.length) {
        ctx.reply(
          'Нет ни одного rss. Хотите добавить?',
          Markup.inlineKeyboard([Markup.button.callback('Add', 'add')]),
        );
        return;
      }

      rssList.map((rss) => {
        ctx.reply(
          `${rss.name} - ${rss.url}`,
          Markup.inlineKeyboard([
            Markup.button.callback('Edit', `edit-${rss.id}`),
            Markup.button.callback('Delete', `delete-${rss.id}`),
          ]),
        );
      });
    });
  }

  @Action('add')
  async add(@Ctx() ctx: SceneContext) {
    await ctx.scene.leave();
    await ctx.scene.enter(TelegramCommands.rss_add);
  }

  @Action(/^edit-/)
  async edit(@Ctx() ctx: SceneContext) {
    await ctx.scene.leave();
    await ctx.scene.enter('rss-edit');
  }

  @Action(/^delete-/)
  async delete(@Ctx() ctx: SceneContext) {
    const [, rssId] = ctx.update['callback_query'].data.split('-');
    this.rssTableService
      .deleteRssById(rssId)
      .subscribe(() => ctx.scene.leave());
  }
}
