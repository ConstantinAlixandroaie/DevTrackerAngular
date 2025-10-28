import { Injectable } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { LoginRequest, LoginResponse,RegisterRequest,RegisterResponse } from '../../account/models/account.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly TOKEN_KEY='auth_token';

 isAuthenticated():boolean{
    const token = this.getToken();
    console.log('[AuthService] isAuthenticated check:', token !== null);
    return token !== null;
  }
  
  constructor(private api:ApiService) { 
  }

  login(credentials:LoginRequest):Observable<LoginResponse>{
    return this.api.post<LoginResponse>('identity/login', credentials).pipe(
      tap(response => {
        this.setToken(response.accessToken);
      })
    );
  }

 logout():void{
    this.clearToken();
  }
  
  register(credentials:RegisterRequest):Observable<RegisterResponse>{
    return this.api.post<RegisterResponse>('identity/register', credentials).pipe(
      tap(response => {
        if (response.status === 400) {
          console.log('Registration failed:', response);
        } else {
          console.error('Registration succesful:', response);
        }
      })
    );
  }

  //TODO:Implement refresh token logic
  //TODO: Move to a dedicated TokenService

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.log('Retrieved token from localStorage:', token);

    if (!token || token === 'undefined' || token === 'null') {
      localStorage.removeItem(this.TOKEN_KEY);
      return null;
    }
    return token;
  }
}
