import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../models/register-creds';
import { AccountService } from '../../../core/services/account-service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  // members = input.required<User[]>();
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  protected credentials: RegisterCreds = {
    displayName: '',
    email: '',
    password: '',
  };

  register(): void {
    this.accountService.register(this.credentials).subscribe({
      next: (response: User) => {
        console.log('Registration successful:', response);
        this.cancel();
      },
      error: (error) => {
        console.error('Registration failed:', error);
      },
    });
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }
}
