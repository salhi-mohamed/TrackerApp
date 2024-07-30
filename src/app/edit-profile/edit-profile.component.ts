import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { CheckLoginService } from '../check-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  originalEmail: string = ''; 

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private checkLoginService: CheckLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      if (user) {
        this.user = { ...user };
        this.originalEmail = user.email || ''; 
      }
    });
  }

  saveProfile(): void {
    if (this.user.email !== this.originalEmail) {
      // Check that originalEmail is a string before calling updateUser
      if (this.originalEmail) {
        this.checkLoginService.updateUser(this.originalEmail, this.user.email);
      }
    }
    this.userService.updateUser(this.user);
    this.authService.updateCurrentUser(this.user); // Update AuthService with the new user data
    alert('Profile updated successfully!');
    this.router.navigate(['/viewProfile']); // Navigate to profile or any other page
  }
}