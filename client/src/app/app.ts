import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';

import { User } from '../models/user';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly pageTitle = 'Dating App';
  private httpClient: HttpClient = inject(HttpClient);
  private accountService = inject(AccountService);
  protected members = signal<Array<User>>([]);

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers(): void {
    this.httpClient.get<Array<User>>('https://localhost:7162/api/Members').subscribe({
      next: (data: Array<User>) => {
        this.members.set(data);
      },
      error: (error) => {
        console.error('Error fetching Users:', error);
      },
      complete: () => {
        console.log('Fetch Users request completed.');
      },
    });
  }

  setCurrentUser(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.accountService.setCurrentUser(user);
    } else {
      console.log('No current user found in localStorage.');
    }
  }
}
