import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Event {
  id: number;
  title: string;
  date: string; 
  color: string;
  timeLeft?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsSubject = new BehaviorSubject<Event[]>([
  ]);
  events$ = this.eventsSubject.asObservable();

  addEvent(event: Event) {
    const currentEvents = this.eventsSubject.value;
    this.eventsSubject.next([...currentEvents, event]);
  }

  getEvents() {
    return this.eventsSubject.value;
  }

  removeEvent(eventId: number) {
    const currentEvents = this.eventsSubject.value.filter(event => event.id !== eventId);
    this.eventsSubject.next(currentEvents);
  }

  hasEvents(): boolean {
    return this.eventsSubject.value.length > 0;
  }
}
