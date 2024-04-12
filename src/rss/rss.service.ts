import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RssService {
  constructor(private readonly httpService: HttpService) {}

  getRss(): Observable<AxiosResponse<any>> {
    return this.httpService.get('https://habr.com/ru/rss/articles/?fl=ru').pipe(
      map((res) => res)
    )
  }
}
