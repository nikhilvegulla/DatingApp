import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/user';
import { LoginCreds } from '../../models/login-creds';
import { RegisterCreds } from '../../models/register-creds';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private httpClient: HttpClient = inject(HttpClient);
  private baseUrl: string = 'https://localhost:7162/api';
  private currentUser = signal<User | null>(null);

  login(credentials: LoginCreds): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/accounts/login`, credentials).pipe(
      tap((user: User) => {
        this.setCurrentUser(user);
      }),
    );
  }

  register(credentials: RegisterCreds): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/accounts/register`, credentials).pipe(
      tap((user: User) => {
        this.setCurrentUser(user);
      }),
    );
  }

  setCurrentUser(user: User): void {
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logOut(): void {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  getCurrentUser(): Signal<User | null> {
    return this.currentUser;
  }
}
