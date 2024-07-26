import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any = null;
  userSubscription: Subscription = new Subscription();
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const updatedUser = { ...this.user, profileImageUrl: e.target.result };
        this.userService.updateUser(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  }

  editProfile(): void {
    this.router.navigate(['/edit-profile']);
  }
}
