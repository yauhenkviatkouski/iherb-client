import { Action, createReducer, on } from '@ngrx/store';
import { IAuthState } from '../types/authState.interface';
import { registerAction } from './register.action';

const initialState: IAuthState = {
  isSubmitting: false,
};

const authReducer = createReducer(
  initialState,
  on(registerAction, (state): IAuthState => ({ ...state, isSubmitting: true })),
);

export function reducer(state: IAuthState, action: Action) {
  return authReducer(state, action);
}
