import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { RssService } from './rss.service';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { Cron } from '@nestjs/schedule';
import * as Parser from 'rss-parser';
import { AxiosResponse } from 'axios';

@Controller('rss')
export class RssController {
  parser = new Parser<{ [p: string]: any }, { [p: string]: any }>();
  url = 'https://habr.com/ru/rss/articles/?fl=ru';

  constructor(private readonly rssService: RssService) {}

  @Get()
  getRss(@Req() request: Request): Observable<string> {
    console.log(request.statusMessage);
    return this.rssService.getRss(this.url).pipe(map((rss) => rss.statusText));
  }

  @Cron('*/10 * * * * 1')
  handleCron(): void {
    this.rssService
      .getRss(this.url)
      .pipe(
        switchMap((res: AxiosResponse<any>) =>
          from(this.parser.parseString(res.data)),
        ),
        tap((rss: { [p: string]: any } & Parser.Output<{ [p: string]: any }>) =>
          console.log(rss.items[0]),
        ),
      )
      .subscribe();
  }
}
