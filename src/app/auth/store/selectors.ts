import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/shared/types/appState.interface';
import { IAuthState } from '../types/authState.interface';

export const authFeatureSelector = createFeatureSelector<IAppState, IAuthState>(
  'auth',
);

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState) => authState.isSubmitting,
);
