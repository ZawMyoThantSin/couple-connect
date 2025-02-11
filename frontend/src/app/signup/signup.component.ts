import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  handleSubmit(event: Event) {
    event.preventDefault();
    // Here you would normally register the user with your backend
    console.log('Signing up with:', this.name, this.email, this.password);
    this.router.navigate(['/dashboard']);
  }
}
