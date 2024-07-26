import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-google-calendar-integration',
  templateUrl: './google-calendar-integration.component.html',
  styleUrls: ['./google-calendar-integration.component.css']
})
export class GoogleCalendarIntegrationComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
