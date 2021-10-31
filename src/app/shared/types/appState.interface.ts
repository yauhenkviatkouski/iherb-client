import { IAuthState } from 'src/app/auth/types/authState.interface';
import { ILinkParserState } from '../modules/link-parser/types/linkParserState.interface';

export interface IAppState {
  auth: IAuthState;
  linkParser: ILinkParserState;
}
