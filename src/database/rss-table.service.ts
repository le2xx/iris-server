import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RssList } from './rss-table.entity';
import { Repository } from 'typeorm';
import { RssItem } from '../telegram/telegram.models';
import { from, Observable } from 'rxjs';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class RssTableService {
  constructor(
    @InjectRepository(RssList)
    private readonly rssTableRepository: Repository<RssList>,
  ) {}

  createRss(rss: RssItem): Observable<RssList> {
    const rssItem = this.rssTableRepository.create(rss);
    return from(this.rssTableRepository.save(rssItem));
  }

  getAllRss(): Observable<RssList[]> {
    return from(this.rssTableRepository.find());
  }

  deleteRssById(id: string): Observable<DeleteResult> {
    return from(this.rssTableRepository.delete(id));
  }
}
