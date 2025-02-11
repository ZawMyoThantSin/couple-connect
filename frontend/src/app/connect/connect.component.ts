import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent {
  partnerCode = '';
  isLoading = false;

  constructor(private router: Router) {}

  handleConnect() {
    this.isLoading = true;
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('isPartnerConnected', 'true');
      this.router.navigate(['/dashboard']);
    }, 1500);
  }
}
