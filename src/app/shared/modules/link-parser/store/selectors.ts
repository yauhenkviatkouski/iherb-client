import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/shared/types/appState.interface';
import { ILinkParserState } from '../types/linkParserState.interface';

export const parseLinkFeatureSelector = createFeatureSelector<
  IAppState,
  ILinkParserState
>('linkParser');

export const isSubmittingSelector = createSelector(
  parseLinkFeatureSelector,
  (parseLinkState: ILinkParserState) => parseLinkState.isSubmitting,
);
