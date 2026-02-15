import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { User } from '../../models/user';
import { LoginCreds } from '../../models/login-creds';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService: AccountService = inject(AccountService);
  protected credentials: LoginCreds = {
    email: '',
    password: '',
  };

  protected login(): void {
    this.accountService.login(this.credentials).subscribe({
      next: (response: User) => {
        this.accountService.setCurrentUser(response);
        this.credentials = { email: '', password: '' };
      },
      error: (error: any) => {
        console.error('Login failed:', error);
      },
    });
  }

  protected logOut(): void {
    this.accountService.logOut();
  }
}
