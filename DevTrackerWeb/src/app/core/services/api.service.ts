import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Console } from 'console';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  get<T>(endpoint: string, options = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      ...options,
      withCredentials: true 
    });
  }

  post<T>(endpoint: string, body: any, options = {}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {
      ...options,
      withCredentials: true
    });
  }

  delete<T>(endpoint: string, options = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      ...options,
      withCredentials: true
    });
  }

  patch<T>(endpoint: string, body: any, options = {}): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, {
      ...options,
      withCredentials: true
    });
  }

  put<T>(endpoint: string, body: any, options = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, {
      ...options,
      withCredentials: true
    });
  }
}