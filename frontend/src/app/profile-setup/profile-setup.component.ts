import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../services/user/profile.service';
import { AuthService } from '../services/authentication/auth.service';
import { JwtService } from '../services/jwt/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-setup',
  template: `
  <div class="h-screen flex flex-col bg-love-lavender">
  <ng-container>
    <header class="bg-white shadow-md p-4 flex justify-between items-center z-40 relative">
      <h2 class="text-xl font-bold text-primary flex items-center">
        <i-lucide name="heart" class="mr-2 text-love-red animate-heartbeat"></i-lucide>
        CoupleConnect
      </h2>
    </header>
  </ng-container>

  <!-- Profile Setup -->
  <div class="flex-1 flex items-center justify-center bg-love-lavender">
    <div class="relative flex flex-col items-center bg-white shadow-lg w-full max-w-xl p-8 md:p-12 md:rounded-lg md:h-auto sm:h-screen sm:w-full sm:rounded-none sm:flex sm:justify-center">

      <!-- Title -->
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Set Up Your Profile</h2>

      <!-- Avatar Selection -->
      <div class="relative w-32 h-32">
        <img [src]="avatarUrl || randomCartoonAvatar()"
             class="w-full h-full rounded-full object-cover border-4 border-love-pink shadow-md">

        <!-- Hidden File Input -->
        <input #fileInput type="file" (change)="onFileSelected($event)" class="absolute inset-0 opacity-0 cursor-pointer">

        <!-- Pen Icon (Click to edit) -->
        <div class="absolute bottom-2 right-2 bg-love-pink p-2 rounded-full shadow-md cursor-pointer transition hover:bg-love-red"
             (click)="triggerFileInput()">
          <i-lucide name="pen" class="text-white w-5 h-5"></i-lucide>
        </div>
      </div>

      <!-- Name Input -->
      <input type="text" [(ngModel)]="name" placeholder="Enter your name" #nameField="ngModel"
             class="text-center text-lg font-medium text-gray-700 bg-transparent border-b border-gray-300 focus:outline-none focus:border-love-pink w-64 mt-4">
      <p class="text-red-500 text-sm" *ngIf="nameField.touched && name && name.length < 3">
        Name must be at least 3
            characters
          </p>
      <p class="text-red-500 text-sm" *ngIf="nameField.touched && !name">Name is required</p>
      <!-- Next Button -->
      <button (click)="submitProfile()" [disabled]="!name && name.length < 3"
              class="mt-6 bg-love-pink text-white py-3 w-64 rounded-lg shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>

    </div>
  </div>
</div>




  `,
  styleUrl: './profile-setup.component.css'
})
export class ProfileSetupComponent {
  name: string = '';
  avatarUrl: string | null = null;
  selectedFile: File | null = null;
  userId!: number | null;
  defaultAvatarUrl: string | null = null;
  avatarSet: boolean = false;
  errorMessage: string = '';

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private profileService: ProfileService,
              private authService: AuthService,
              private jwtService: JwtService,
              private router: Router
            ) {
    authService.userId$.subscribe((id) => {
      this.userId = id;
      if (this.userId == null) {
        const token:any = localStorage.getItem("token");
        this.userId = jwtService.getUserId(token);
      }
    }, () => {
      const token:any = localStorage.getItem("token");
      this.userId = jwtService.getUserId(token);
    });
  }

  // Set the initial random avatar URL only once
  ngOnInit(): void {
    if (!this.avatarSet) {
      this.defaultAvatarUrl = this.randomCartoonAvatar(); // Generate default avatar only once
      this.avatarUrl = this.defaultAvatarUrl;
      this.avatarSet = true; // Ensure this is set once
    }
  }

  // Randomly select a cartoon avatar if the user doesn't upload one
  randomCartoonAvatar(): string {
    const avatars = [
      'assets/default-avatar/av1.png',
      'assets/default-avatar/av2.png',
      'assets/default-avatar/av3.png',
      'assets/default-avatar/av4.png',
      'assets/default-avatar/av5.png',
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  // Handle file selection and update avatarUrl for preview
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string; // Update with selected file image
      };
      reader.readAsDataURL(file);
    }
  }

  // Trigger the file input dialog
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  isFormValid(): boolean {
    return this.name.trim().length >= 3;
  }

  submitProfile(): void {
    if (this.isFormValid()) {
      const formData = new FormData();
      formData.append('name', this.name);

      // Append the selected file (image) to the FormData
      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile, this.selectedFile.name);
      } else {
        // If no avatar was selected, append the default avatar as a file object
        const defaultAvatarPath = this.randomCartoonAvatar(); // Get the default avatar path
        this.createImageFileFromPath(defaultAvatarPath).then((defaultImageFile) => {
          formData.append('avatar', defaultImageFile, 'default-avatar.png'); // Send default avatar as a file
          this.sendProfileData(formData); // Send the form data after appending the default image
        });
        return; // Prevent further execution until the image is created and form data is sent
      }

      // Send the form data to API
      this.sendProfileData(formData);
    } else {
      this.errorMessage = "Name must be at least 3 characters."
      console.log('Form is not valid');
    }
  }

  // Helper method to create a File object from an image path
  private createImageFileFromPath(imagePath: string): Promise<File> {
    return fetch(imagePath)
      .then(response => response.blob())
      .then(blob => {
        return new File([blob], 'default-avatar.png', { type: blob.type });
      });
  }

  // Helper method to send the form data to the profile service
  private sendProfileData(formData: FormData): void {
    this.profileService.setUpProfile(formData, this.userId).subscribe({
      next: (response) => {
        localStorage.removeItem("setupNeed");
        this.router.navigate(['/dashboard']);
        console.log('Profile setup successful:');
      },
      error: (error) => {
        console.error('Error during profile setup:', error);
        // Handle error (e.g., show an error message)
      }
    });
  }
}
