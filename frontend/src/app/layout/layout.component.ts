import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from '../models/user';
import { ProfileService } from '../services/user/profile.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  authUser: User | null = null;
  isDesktop = true;
  isSidebarOpen = true;
  isPartnerConnected = false;
  currentRoute = '';

  constructor(private router: Router,private profileService: ProfileService) {}


  fakeUser = {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "https://i.pravatar.cc/150?img=5"
  };

  connectedNavItems = [
    { href: '/dashboard', icon: 'house', label: 'Home' },
    { href: '/chat', icon: 'message-circle', label: 'Chat' },
    { href: '/timeline', icon: 'calendar', label: 'Timeline' },
    { href: '/reminders', icon: 'bell', label: 'Reminders' },
    { href: '/profile', icon: 'user', label: 'Profile' },
  ];

  unconnectedNavItems = [
    { href: '/dashboard', icon: 'house', label: 'Home' },
    { href: '/profile', icon: 'user', label: 'Profile' },
  ];

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));

    const connectionStatus = localStorage.getItem('isPartnerConnected');
    this.isPartnerConnected = connectionStatus === 'true';

    this.getUserProfile();

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd) // ✅ Type assertion
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });
  }

  private getUserProfile(){
    this.profileService.getProfile().subscribe((response)=>{
      this.authUser = response;
      this.profileService.updateUserState(this.authUser);
    }, (error) => {
      if(error.status === 498){
        alert("Session expired, redirecting to login");
        this.router.navigate(['/login']);
      }
    });
  }

  public getImageUrl(imagePath: any): string {
    if(imagePath){
      return 'http://localhost:8080'+imagePath;
    }
    return 'assets/default-avatar/av1.png';
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth >= 1024;
    if (!this.isDesktop) {
      this.isSidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  get navItems() {
    return this.isPartnerConnected ? this.connectedNavItems : this.unconnectedNavItems;
  }
}
