import { Injectable } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

interface LoginRequest{
  email: string;
  password: string;
}

interface LoginResponse{
  token: string;
  user:{
    id: number;
    name: string;
    email: string;
  }
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly TOKEN_KEY='auth_token';

  isAuthenticated():boolean{
    return this.getToken() !== null;
  }

  constructor(private api:ApiService) { 
    const token = this.getToken();
    if (token) {
      this.api.setAuthHeader(token);
    }
  }

  login(credentials:LoginRequest):Observable<LoginResponse>{
    return this.api.post<LoginResponse>('identity/login', credentials).pipe(
      tap(response => {
        this.setToken(response.token);
        this.api.setAuthHeader(response.token);
      })
    );
  }

 logout():void{
    this.clearToken();
    this.api.clearAuthHeader();
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
     const token = localStorage.getItem(this.TOKEN_KEY);

   if (!token || token === 'undefined' || token === 'null') {
      localStorage.removeItem(this.TOKEN_KEY);
      return null;
   }

  return token;
  }
}
