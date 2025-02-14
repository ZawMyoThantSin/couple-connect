import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  showPassword: boolean = false; // Track password visibility
  isMobile: boolean = window.innerWidth < 768;
  showErrorAlert: boolean = false;
  errorMessage: string = '';
  isClosing = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  constructor(private router: Router,
              private authService: AuthService
  ) {}


  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Check if password is strong (optional)
  isPasswordValid(): boolean {
    return this.password.length >= 8;
  }

  // Handle form submission
  handleSubmit(event: Event) {
    event.preventDefault();
    if (!this.isPasswordValid()) {
      this.error = 'Invalid password. Must be at least 8 characters.';
      return;
    }
    let signupData:User = {
      email: this.email,
      password: this.password
    }
    this.authService.login(signupData).subscribe(
      (response) => {
        this.email = '';
        this.password = '';
        console.log('Login successful', response);
        this.authService.updateUserId(response.id);
        this.authService.userId$.subscribe((id) => {
          console.log(id)
        })
        localStorage.setItem("token",response.token);
        const msg = response.message;
        if(msg == 'SETUP_REQUIRED'){
          localStorage.setItem("setupNeed", JSON.stringify(true));
          this.router.navigate(['/setup']);
        }else{
           this.router.navigate(['/dashboard'])
        }
      },
      (error) => {
        // This will be called if the request fails (e.g., invalid credentials or network error)
        console.error('Login failed', error.error);
        this.showErrorAlert = true;
        this.errorMessage = `Login failed. ${error.error.message}`; // Set your error message
      }
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
