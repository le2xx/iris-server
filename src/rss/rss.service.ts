import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RssService {
  constructor(private readonly httpService: HttpService) {}

  getRss(url: string): Observable<AxiosResponse<any>> {
    return this.httpService.get(url).pipe(map((res) => res));
  }
}
