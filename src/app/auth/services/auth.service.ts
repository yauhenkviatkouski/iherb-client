import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../types/authResponse.interface';
import { IRegisterRequest } from '../types/registerRequest.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  register(data: IRegisterRequest): Observable<ICurrentUser> {
    const url = environment.apiUrl + 'auth/register';

    // IAuthResponse and ICurrentUser the same for now
    // if not - use pipe(map(response => .......))
    return this.http.post<IAuthResponse>(url, data);
  }
}
