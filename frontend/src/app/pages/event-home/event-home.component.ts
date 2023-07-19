import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.css'],
})
export class EventHomeComponent {
  events: any;
  largeEvent: any;
  allEvents: boolean = true;
  showFilterForm: boolean = false;

  constructor(protected api: ApiService, private library: FaIconLibrary) {
    library.addIcons(faSliders);
  }

  ngOnInit(): void {
    this.api.getEvents().subscribe((next) => {
      this.events = next;
      this.updateEventsList();
    });
  }

  updateEventsList() {
    console.log(this.events);
    if (this.events.length > 0) {
      this.largeEvent = this.events[0];
      this.events = this.events.slice(1);
    } else {
      console.log('No events found');
    }
  }

  getMyEvents() {
    this.api.getEvents(this.api.userId).subscribe((next) => {
      this.events = next;
      this.updateEventsList();
      this.allEvents = false;
    });
  }

  getAllEvents() {
    this.api.getEvents().subscribe((next) => {
      this.events = next;
      this.updateEventsList();
      this.allEvents = true;
    });
  }
}
