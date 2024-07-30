import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile-picture-upload',
  templateUrl: './profile-picture-upload.component.html',
  styleUrls: ['./profile-picture-upload.component.css']
})
export class ProfilePictureUploadComponent {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService, 
    private router: Router
  ) {}

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          // Mettre à jour l'image de profil dans UserService
          this.userService.updateUser({ profileImageUrl: reader.result as string });
          alert('Profile picture uploaded successfully!');
          this.router.navigate(['/home']); // Redirect to home after upload
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}