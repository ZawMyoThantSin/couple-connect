import { Component } from '@angular/core';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent {
  reminders = [
    { id: 1, date: "May 15, 2023", title: "Sarah's Birthday", icon: "gift", color: "text-love-red" },
    { id: 2, date: "June 20, 2023", title: "Our Anniversary", icon: "heart", color: "text-love-pink" },
    { id: 3, date: "July 5, 2023", title: "Date Night", icon: "calendar", color: "text-love-purple" },
    { id: 4, date: "August 10, 2023", title: "Weekend Getaway", icon: "map", color: "text-love-pink" },
  ];
}
