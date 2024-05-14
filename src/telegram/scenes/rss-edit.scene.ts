import { Injectable } from '@nestjs/common';
import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/scenes';

Injectable();
@Scene('rss-edit')
export class RssEditScene {
  @SceneEnter()
  async unlinkEnter(@Ctx() ctx: SceneContext) {
    const [, rssId] = ctx.update['callback_query'].data.split('-');
    console.log(rssId);
    await ctx.reply(`rss-edit - ${rssId}`);
  }
}
