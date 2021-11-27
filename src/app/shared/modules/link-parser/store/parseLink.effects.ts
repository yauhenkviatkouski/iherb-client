import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import {
  switchMap,
  catchError,
  map,
  retryWhen,
  delay,
  mergeMap,
  shareReplay,
} from 'rxjs/operators';
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
        this.linkParserService.parse(request.link).pipe(
          delayedRetry(1500, 3),
          map((products) => parseLinkSuccessAction({ products })),
          catchError((errorResponse: HttpErrorResponse) =>
            of(parseLinkFailureAction({ error: errorResponse.error })),
          ),
          shareReplay(),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private linkParserService: LinkParserService,
  ) {}
}

function delayedRetry(delayMs: number, retryTimes: number) {
  let attempts = 0;
  return (scr: Observable<any>) =>
    scr.pipe(
      retryWhen((errors) =>
        errors.pipe(
          delay(delayMs),
          mergeMap((error) =>
            attempts++ === retryTimes ? throwError(error) : of(error),
          ),
        ),
      ),
    );
}
