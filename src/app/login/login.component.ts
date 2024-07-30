import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckLoginService } from '../check-login.service';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  test1: boolean = false;
  passwordStrength: string = '';

  constructor(
    private route: Router,
    private checkLoginService: CheckLoginService,
    private authService: AuthService 
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      alert('All fields are required');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(this.email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (this.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    if (this.checkLoginService.userExists(this.email, this.password)) {
      alert('Login successful!');
      this.test1 = true;
      const profileImageUrl = this.authService.getCurrentProfileImage(); // Get the current profile image URL
      this.authService.login(profileImageUrl); // Log the user in with the current profile image URL
      this.GoToHome();
    } else if (this.checkLoginService.emailExists(this.email)) {
      alert('Incorrect password!');
    } else {
      alert('User not registered!');
    }
  }

  GoToHome() {
    if (this.test1) {
      this.route.navigate(['/home']);
    }
  }

  onPasswordInput() {
    this.passwordStrength = this.getPasswordStrength(this.password);
  }

  getPasswordStrength(password: string): string {
    if (password.length < 8) {
      return 'weak';
    }

    let strength = 0;
    if (/[a-z]/.test(password)) {
      strength++;
    }
    if (/[A-Z]/.test(password)) {
      strength++;
    }
    if (/\d/.test(password)) {
      strength++;
    }
    if (/[@$!%*?&#]/.test(password)) {
      strength++;
    }

    if (strength === 1) {
      return 'weak';
    } else if (strength === 2) {
      return 'medium';
    } else if (strength >= 3) {
      return 'strong';
    }
    return 'weak';
  }
}