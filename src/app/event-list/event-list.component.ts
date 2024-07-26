import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService, Event } from '../event.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  private subscription!: Subscription;
  hasEvents: boolean = true;
  showDialog: boolean = false;
  eventToDelete: Event | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.events$.subscribe(events => {
      this.events = events;
      this.hasEvents = events.length > 0; // Check if there are events
    });

    // Mettre à jour le temps restant toutes les secondes
    this.subscription = interval(1000).subscribe(() => {
      this.updateTimeLeft();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateTimeLeft(): void {
    const now = new Date().getTime();
    this.events.forEach(event => {
      const eventDate = new Date(event.date).getTime();
      const timeLeft = eventDate - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        event.timeLeft = `${days}j ${hours}h ${minutes}m ${seconds}s`;
      } else {
        event.timeLeft = 'Événement terminé';
      }
    });
  }

  deleteEvent(eventId: number): void {
    this.eventToDelete = this.events.find(event => event.id === eventId) || null;
    this.showDialog = true;
  }

  confirmDelete(confirmed: boolean): void {
    if (confirmed && this.eventToDelete) {
      this.eventService.removeEvent(this.eventToDelete.id);
      this.events = this.eventService.getEvents();
    }
    this.showDialog = false;
    this.eventToDelete = null;
  }

  getEventCategoryLabel(color: string): string {
    switch (color) {
      case 'work': return 'Travail';
      case 'personal': return 'Personnel';
      case 'other': return 'Autre';
      default: return 'Inconnu';
    }
  }

  getEventCategoryClass(color: string): string {
    switch (color) {
      case 'work': return 'badge-primary';
      case 'personal': return 'badge-success';
      case 'other': return 'badge-secondary';
      default: return 'badge-dark';
    }
  }
}
