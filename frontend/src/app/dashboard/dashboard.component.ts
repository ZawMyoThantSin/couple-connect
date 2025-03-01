import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/user/profile.service';
import { User } from '../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  profileData: User | null = null;
  isPartnerConnected = false;
  connectionCode: string = '';
  fakeUser = {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    partnerName: "Michael Smith",
    partnerAvatar: "https://i.pravatar.cc/150?img=12",
  };

  constructor(private router: Router, private profileService: ProfileService) {
    this.connectionCode = Math.random().toString().substring(2, 8);
  }

  ngOnInit() {
    this.getUserProfile();
  }

  handleConnect() {
    this.router.navigate(['/connect']);
  }

  copyCode() {
    navigator.clipboard.writeText(this.connectionCode).then(() => {
      console.log('Code copied to clipboard');
    });
  }

  private getUserProfile(){
    this.profileService.userProfile$.subscribe((response)=>{
      this.profileData = response;
      this.isPartnerConnected = response?.hasPartner || false;
      this.connectionCode = response?.uniqueCode || '';
    });
  }

  public getImageUrl(imagePath: any): string {
    if(imagePath){
      return 'http://localhost:8080'+imagePath;
    }
    return 'assets/default-avatar/av1.png';
  }
}
