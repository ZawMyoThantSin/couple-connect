import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isPartnerConnected = false;
  fakeUser = {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    partnerName: "Michael Smith",
    partnerAvatar: "https://i.pravatar.cc/150?img=12",
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const connectionStatus = localStorage.getItem('isPartnerConnected');
    this.isPartnerConnected = connectionStatus === 'true';
  }

  handleConnect() {
    this.router.navigate(['/connect']);
  }
}
