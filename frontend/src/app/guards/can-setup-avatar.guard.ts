import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const canSetupAvatarGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const setupNeed = JSON.parse(localStorage.getItem('setupNeed') || 'false'); // Default to false if null
  console.log("IN Guard ", setupNeed)
  if (!setupNeed) {
    router.navigate(['']); // Redirect back to the same page
    return false;
  }

  return true;
};
