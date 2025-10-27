import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ApiService {
  private baseUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}
 
  setAuthHeader(token: string) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
       `Bearer ${token}`
      );
  }

  clearAuthHeader(): void {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
  }

  get<T>(endpoint: string, options = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, options);
  }

  post<T>(endpoint: string, body: any, options = {}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, options);
  }

  delete<T>(endpoint: string, body: any) {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, body);
  }
}
