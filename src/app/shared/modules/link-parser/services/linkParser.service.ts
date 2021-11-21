import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IParseLinkResponse } from '../types/parserLinkResponse.interface';
import { IProduct } from '../types/product.interface';

@Injectable()
export class LinkParserService {
  constructor(private readonly http: HttpClient) {}

  parse(link: string): Observable<IProduct[]> {
    // const url = environment.apiUrl + 'iherb/' + encodeURIComponent(link);
    // return this.http.get<IProduct[]>(url);
    // const url = environment.apiUrl + 'iherb/' + encodeURIComponent(link);
    return this.http.post<IProduct[]>(
      'https://ru-1.gateway.serverless.selcloud.ru/api/v1/web/fa6a4b53ae5c4f8585670766c05776bd/default/get-Iherb',
      { link },
    );
  }
}
