import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { User } from '../../models/user';
import { LoginCreds } from '../../models/login-creds';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private router = inject(Router);
  private toastService = inject(ToastService);
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
        this.router.navigate(['/members']);
        this.toastService.success('Login successful!', 3000);
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        this.toastService.error(error.error || 'Login failed. Please try again.', 5000);
      },
    });
  }

  protected logOut(): void {
    this.accountService.logOut();
    this.router.navigate(['/']);
  }
}
