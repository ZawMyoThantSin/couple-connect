import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/authentication/auth.service';

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
  showPassword: boolean = false; // Track password visibility
  showErrorAlert: boolean = false;
  errorMessage: string = '';
  isClosing = false;

  isMobile: boolean = window.innerWidth < 768;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }
  constructor(private router: Router,
              private authService: AuthService


  ) {}

  handleSubmit(event: Event) {
    event.preventDefault();
    // Here you would normally register the user with your backend
    console.log('Signing up with:', this.name, this.email, this.password);
    let signupData:User = {
      name : this.name,
      email: this.email,
      password: this.password
    }
    this.authService.signup(signupData).subscribe(
      (response) => {
        // This will be called when the HTTP request is successful (response received)
        this.name = '';
        this.email = '';
        this.password = '';
        // console.log('Signup successful', response);
        this.authService.updateUserId(response.data.id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("setupNeed", JSON.stringify(true));
        this.router.navigate(['/setup'])
      },
      (error) => {
        // This will be called if the request fails (e.g., invalid credentials or network error)
        console.error('Signup failed', error.error);
        this.showErrorAlert = true;
        this.errorMessage = `Signup failed. ${error.error.message}`; // Set your error message
      }
    );


  }


  isPasswordValid(): boolean {
    return (
      this.password.length >= 8 &&
      /[A-Z]/.test(this.password) && // At least one uppercase letter
      /[a-z]/.test(this.password) && // At least one lowercase letter
      /[0-9]/.test(this.password) && // At least one number
      /[!@#$%^&*]/.test(this.password) // At least one special character
    );
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Get password error message (only show one at a time)
  getPasswordError(): string | null {
    if (this.password.length > 0 && this.password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!this.isPasswordValid()) {
      return 'Password must include uppercase, lowercase, number, and special character (!@#$%^&*)';
    }
    return null;
  }

  // Check if the form is valid (used to enable/disable submit button)
  isFormValid(): boolean {
    return (
      this.name.length >= 3 &&
      this.email.includes('@') &&
      this.isPasswordValid()
    );
  }

  closeErrorAlert() {
    this.isClosing = true;  // Start fade-out animation

    setTimeout(() => {
      this.showErrorAlert = false; // Remove alert after animation
      this.isClosing = false;  // Reset for future alerts
    }, 400);  // Match the duration of the CSS animation (0.4s)
  }
}
