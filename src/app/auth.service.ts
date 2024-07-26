import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private profileImage = new BehaviorSubject<string>('assets/default-profile.png');
  private currentUser = new BehaviorSubject<any>(null);

  constructor(private route: Router) {}

  login(email: string, profileImageUrl: string = 'assets/default-profile.png') {
    this.loggedIn.next(true);
    this.profileImage.next(profileImageUrl);
    this.currentUser.next({ email, profileImageUrl });
  }

  logout() {
    this.loggedIn.next(false);
    this.profileImage.next('assets/default-profile.png');
    this.currentUser.next(null);
    this.route.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  getProfileImage(): Observable<string> {
    return this.profileImage.asObservable();
  }

  getCurrentProfileImage(): string {
    return this.profileImage.value;
  }

  updateProfileImage(imageUrl: string) {
    const user = this.currentUser.value;
    if (user) {
      user.profileImageUrl = imageUrl;
      this.currentUser.next(user);
    }
    this.profileImage.next(imageUrl);
  }

  updateCurrentUser(user: any) {
    this.currentUser.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }
}