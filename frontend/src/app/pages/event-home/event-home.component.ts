import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LimeEvent } from 'src/app/classes/limeEvent';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.css'],
})
export class EventHomeComponent {
  events!: LimeEvent[];
  largeEvent!: LimeEvent;
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

  filterEvents(filter: {
    filterDateMin: string;
    filterDateMax: string;
    filterLocation: string;
  }) {
    let userId = '';
    if (!this.allEvents) {
      userId = this.api.userId;
    }
    this.api
      .getEvents(
        userId,
        [],
        filter.filterDateMin,
        filter.filterDateMax,
        filter.filterLocation
      )
      .subscribe((next) => {
        this.events = next;
        this.updateEventsList();
      });
  }
}
