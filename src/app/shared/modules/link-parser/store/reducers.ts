import { Action, createReducer, on } from '@ngrx/store';
import { ILinkParserState } from '../types/linkParserState.interface';
import {
  parseLinkAction,
  parseLinkFailureAction,
  parseLinkSuccessAction,
} from './parseLink.action';

const initialState: ILinkParserState = {
  errors: null,
  isSubmitting: false,
  products: null,
};

const parseLinkReducer = createReducer(
  initialState,
  on(
    parseLinkAction,
    (state): ILinkParserState => ({
      ...state,
      isSubmitting: true,
      errors: null,
    }),
  ),
  on(
    parseLinkSuccessAction,
    (state, action): ILinkParserState => ({
      ...state,
      isSubmitting: false,
      errors: null,
      products: action.products,
    }),
  ),
  on(
    parseLinkFailureAction,
    (state, action): ILinkParserState => ({
      ...state,
      isSubmitting: false,
      errors: action.errors,
      products: null,
    }),
  ),
);

export function reducer(state: ILinkParserState, action: Action) {
  return parseLinkReducer(state, action);
}
