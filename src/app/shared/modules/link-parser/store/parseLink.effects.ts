import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { LinkParserService } from '../services/linkParser.service';
import {
  parseLinkAction,
  parseLinkFailureAction,
  parseLinkSuccessAction,
} from './parseLink.action';

@Injectable()
export class LinkParserEffect {
  parseLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(parseLinkAction),
      switchMap(({ request }) =>
        this.linkParserService
          .parse(request.link)
          .pipe(
            map((products) => parseLinkSuccessAction({ products: products })),
          ),
      ),
      catchError((errorResponse: HttpErrorResponse) =>
        of(parseLinkFailureAction(errorResponse.error.errors)),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private linkParserService: LinkParserService,
  ) {}
}
