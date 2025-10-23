import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private api:ApiService) { }
  login(credentials:LoginRequest):Observable<LoginResponse>{
    return this.api.post<LoginResponse>('identity/login', credentials
    );}

  logout():void{
    localStorage.removeItem('token');
  }
}
