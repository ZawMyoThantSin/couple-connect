import {  Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  fakeUser = {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    partnerName: "Michael Smith",
    anniversaryDate: "June 20, 2021",
  };

  reminders = [
    { id: 1, date: "May 15, 2023", title: "Sarah's Birthday", icon: "gift", color: "text-love-red" },
    { id: 2, date: "June 20, 2023", title: "Our Anniversary", icon: "heart", color: "text-love-pink" },
    { id: 3, date: "July 5, 2023", title: "Date Night", icon: "calendar", color: "text-love-purple" },
  ];
}
