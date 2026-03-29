import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account-service';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast-service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toaster = inject(ToastService);
  const currentUser = accountService.getCurrentUser()();
  if (currentUser) {
    return true;
  } else {
    toaster.error('You shall not pass! Please log in to access this page.', 5000);
    return false;
  }
};
