import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../types/product.interface';

@Injectable()
export class LinkParserService {
  constructor(private readonly http: HttpClient) {}

  // parse(link: string): Observable<IProduct[]> {
  //   return;
  // }
}
