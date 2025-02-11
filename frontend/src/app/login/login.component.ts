import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  handleSubmit(event: Event) {
    event.preventDefault();
    // Here you would normally authenticate with your backend
    console.log('Logging in with:', this.email, this.password);
    this.router.navigate(['/dashboard']);
  }
}
