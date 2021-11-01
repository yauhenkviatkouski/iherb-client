import { createAction, props } from '@ngrx/store';
import { IApiErrors } from 'src/app/shared/types/apiErrors.interface';
import { IProduct } from '../types/product.interface';
import { ActionTypes } from './actionTypes';
import { ILinkParserRequest } from '../types/parseLinkRequest.interface';

export const parseLinkAction = createAction(
  ActionTypes.PARSE_LINK,
  props<{ request: ILinkParserRequest }>(),
);

export const parseLinkSuccessAction = createAction(
  ActionTypes.PARSE_LINK_SUCCESS,
  props<{ products: IProduct[] }>(),
);

export const parseLinkFailureAction = createAction(
  ActionTypes.PARSE_LINK_FAILURE,
  props<{ errors: IApiErrors }>(),
);
