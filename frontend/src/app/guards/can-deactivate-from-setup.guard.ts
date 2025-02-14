import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateFromSetupGuard implements CanDeactivate<unknown> {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const setupNeed = JSON.parse(localStorage.getItem('setupNeed') || 'false');

    // If setup is needed, prevent navigation and ask for confirmation
    if (setupNeed) {
      return window.confirm('You need to complete the setup before leaving this page. Are you sure?');
    }

    return true; // Allow navigation if setup is not needed
  }
}
