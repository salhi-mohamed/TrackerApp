import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckLoginService } from '../check-login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  country: string = '';
  dob: string = '';
  test: boolean = false;

  showModal: boolean = false;

  constructor(
    private router: Router,
    private checkLoginService: CheckLoginService,
    private userService: UserService // Inject UserService
  ) {}

  onSubmit() {
    if (!this.firstname || !this.lastname || !this.email || !this.password || !this.confirmPassword || !this.country || !this.dob) {
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

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

   

    if (!this.isValidDateOfBirth(this.dob)) {
      alert('You must be at least 18 years old');
      return;
    }
    if (this.isEmailAlreadyRegistered(this.email)) {
      alert('Email already registered!');
      return;
    }

    this.showModal = true;
  }

  isEmailAlreadyRegistered(email: string): boolean {
    return this.checkLoginService.emailExists(email);
  }

  isValidDateOfBirth(dob: string): boolean {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return age > 18;
    }
    return age >= 18;
  }

  confirmSubmit() {
    this.checkLoginService.addUser(this.email, this.password);
    alert('Sign-up successful!');

    // Enregistrer l'utilisateur dans UserService
    this.userService.setUser({
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      dob: this.dob,
      country: this.country,
      profileImageUrl: 'default-profile-image-url' // Remplacez ceci par l'URL de l'image de profil si disponible
    });

    this.showModal = false;
    this.navigateToUploadProfilePicture();
  }

  navigateToUploadProfilePicture(): void {
    this.router.navigate(['/UPP']);
  }
}