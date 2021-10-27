import { createAction, props } from '@ngrx/store';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { IRegisterRequest } from '../types/registerRequest.interface';
import { ActionTypes } from './actionTypes';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: IRegisterRequest }>(),
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ currentUser: ICurrentUser }>(),
);

export const registerFailureAction = createAction(ActionTypes.REGISTER_FAILURE);
