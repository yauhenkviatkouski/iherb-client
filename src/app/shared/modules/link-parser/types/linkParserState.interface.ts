import { IApiErrors } from 'src/app/shared/types/apiErrors.interface';
import { IProduct } from './product.interface';

export interface ILinkParserState {
  isSubmitting: boolean;
  errors: IApiErrors | null;
  products: IProduct[];
}
