import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { RssService } from './rss.service';
import { from, map, switchMap, tap } from 'rxjs';
import { Cron } from '@nestjs/schedule';
import * as Parser from "rss-parser";
import { AxiosResponse } from 'axios';

@Controller('rss')
export class RssController {
  parser: Parser<{[p: string]: any},{[p: string]: any}> = new Parser();

  constructor(private readonly rssService: RssService) {
  }

  @Get()
  getRss(@Req() request: Request) {
    return this.rssService.getRss().pipe(map((rss) => rss.statusText));
  }

  @Cron('*/10 * * * * *')
  handleCron(): void {
    this.rssService.getRss()
      .pipe(
        switchMap((res: AxiosResponse<any>) => from(this.parser.parseString(res.data))),
        tap((rss: {[p: string]: any} & Parser.Output<{[p: string]: any}>) => console.log(rss.items[0]))
      )
      .subscribe();
  }
}
