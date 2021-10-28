import { IApiErrors } from 'src/app/shared/types/apiErrors.interface';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';

export interface IAuthState {
  isSubmitting: boolean;
  currentUser: ICurrentUser | null;
  errors: IApiErrors | null;
}
