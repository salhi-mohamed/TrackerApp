import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  image: string = 'assets/definir-objectifs.jpg';

  showObjectivesDetails: boolean = false;
  showTaskFormDetails: boolean = false;
  showManageTimeDetails: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  navigate(route: string) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate([route]);
    }
  }

  toggleDetails(section: string) {
    switch (section) {
      case 'objectives':
        this.showObjectivesDetails = !this.showObjectivesDetails;
        break;
      case 'task-form':
        this.showTaskFormDetails = !this.showTaskFormDetails;
        break;
      case 'manage-time':
        this.showManageTimeDetails = !this.showManageTimeDetails;
        break;
    }
  }

  toggleAllDetails() {
    this.showObjectivesDetails = !this.showObjectivesDetails;
    this.showTaskFormDetails = !this.showTaskFormDetails;
    this.showManageTimeDetails = !this.showManageTimeDetails;
  }

  scroll(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
