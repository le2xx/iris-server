import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RssTable } from './rss-table.entity';
import { Repository } from 'typeorm';
import { RssItem } from '../telegram/telegram.models';

@Injectable()
export class RssTableService {
  constructor(
    @InjectRepository(RssTable)
    private readonly rssTableRepository: Repository<RssTable>,
  ) {}

  async createRss(rss: RssItem): Promise<RssTable> {
    const rssItem = this.rssTableRepository.create(rss);
    return this.rssTableRepository.save(rssItem);
  }

  async getAllRss(): Promise<RssTable[]> {
    return this.rssTableRepository.find();
  }
}
