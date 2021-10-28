import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from '../services/auth.service';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './register.action';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) =>
        this.authService
          .register(request)
          .pipe(
            map((currentUser: ICurrentUser) =>
              registerSuccessAction({ currentUser }),
            ),
          ),
      ),
      catchError((errorResponse: HttpErrorResponse) =>
        of(registerFailureAction(errorResponse.error.errors)),
      ),
    ),
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
