import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly TOKEN_KEY = 'travlr-token';

  constructor(private http: HttpClient) {}

  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/register', {
      name: user.name,
      email: user.email,
      password: passwd,
    });
  }

  public login(user: User, passwd: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:3000/api/login', {
      email: user.email,
      password: passwd,
    });
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
