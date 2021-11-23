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
    return this.http.post<IProduct[]>(environment.cloudParserUrl, { link });
    // TODO: unit test
    // return this.http.post<any>('http://localhost:3000/postTest', { link });
  }
}
