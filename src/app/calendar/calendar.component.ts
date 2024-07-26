
import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService, Event } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;

  eventForm: FormGroup;
  calendarEvents: Event[] = [];
  closeResult: string = '';

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: [] as EventSourceInput,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      eventTitle: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventCategory: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.eventService.events$.subscribe(events => {
      this.calendarEvents = events;
      this.calendarOptions.events = events as EventSourceInput;
    });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addEvent() {
    if (this.eventForm.valid) {
      const newEvent: Event = {
        id: Date.now(), // simple ID generation for the example
        title: this.eventForm.value.eventTitle,
        date: this.eventForm.value.eventDate,
        color: this.getCategoryColor(this.eventForm.value.eventCategory)
      };
      this.eventService.addEvent(newEvent);
      this.eventForm.reset();
      this.modalService.dismissAll(); // close modal after adding event
    }
  }

  handleDateClick(arg: { dateStr: string; }) {
    this.eventForm.patchValue({ eventDate: arg.dateStr });
    this.open(this.modalContent); // open modal when date is clicked
  }

  handleEventClick(arg: { event: any; }) {
    if (confirm(`Voulez-vous supprimer l'événement '${arg.event.title}' ?`)) {
      this.eventService.removeEvent(arg.event.id);
    }
  }

  getCategoryColor(category: string): string {
    switch (category) {
      case 'work':
        return 'blue';
      case 'personal':
        return 'green';
      case 'other':
        return 'gray';
      default:
        return 'black';
    }
  }

  navigateToEvents() {
    this.router.navigate(['/event-list']);
  }


}
