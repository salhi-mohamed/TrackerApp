import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  profileImageUrl:any ;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.getProfileImage().subscribe((url: string) => {
      this.profileImageUrl = url;
      console.log(this.profileImageUrl);
    });
  }

  navigateOrLogin(path: string): void {
    if (this.isLoggedIn) {
      this.router.navigate([path]);
    } else {
      this.router.navigate(['/login']);
    }
  }
  GoToContact()
  {
    this.router.navigate(['/contact'])
  }
}