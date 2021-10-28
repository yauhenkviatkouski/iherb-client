import { Action, createReducer, on } from '@ngrx/store';
import { IAuthState } from '../types/authState.interface';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './register.action';

const initialState: IAuthState = {
  isSubmitting: false,
  currentUser: null,
  errors: null,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): IAuthState => ({ ...state, isSubmitting: true, errors: null }),
  ),
  on(
    registerSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      errors: null,
      currentUser: action.currentUser,
    }),
  ),
  on(
    registerFailureAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      errors: action.errors,
    }),
  ),
);

export function reducer(state: IAuthState, action: Action) {
  return authReducer(state, action);
}
