import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  profileImageUrl: any;
  hasReminder: boolean = false;
  reminderMessage: string | null = null;
  showNotification: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private wsService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.getProfileImage().subscribe((url: string) => {
      this.profileImageUrl = url;
      console.log(this.profileImageUrl);
    });

    this.wsService.messages.subscribe(message => {
      const data = JSON.parse(message.data);
      if (data.message) {
        this.reminderMessage = data.message;
        this.hasReminder = true;
      }
    });
  }

  navigateOrLogin(path: string): void {
    if (this.isLoggedIn) {
      this.router.navigate([path]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  GoToContact() {
    this.router.navigate(['/contact']);
  }

  toggleNotification() {
    this.showNotification = !this.showNotification;
  }
}
