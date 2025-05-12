import {  Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/user/profile.service';
import { User } from '../models/user';
import { GeneralPurposeService } from '../services/general-purpose/general-purpose.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit{
  profile:User | null = null;
  constructor(private profileService: ProfileService,
               private generalService: GeneralPurposeService){

  }
  fakeUser = {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    partnerName: "Michael Smith",
    anniversaryDate: "June 20, 2021",
  };
  ngOnInit(): void {
    this.profileService.userProfile$.subscribe((data)=> {
      this.profile = data
    });
  }

  reminders = [
    { id: 1, date: "May 15, 2023", title: "Sarah's Birthday", icon: "gift", color: "text-love-red" },
    { id: 2, date: "June 20, 2023", title: "Our Anniversary", icon: "heart", color: "text-love-pink" },
    { id: 3, date: "July 5, 2023", title: "Date Night", icon: "calendar", color: "text-love-purple" },
  ];

  public getImageUrl(imagePath: any): string {
    if(imagePath){
      return 'http://localhost:8080'+imagePath;
    }
    return 'assets/default-avatar/av1.png';
  }

  public logout(){
    this.generalService.logout();
  }
}
