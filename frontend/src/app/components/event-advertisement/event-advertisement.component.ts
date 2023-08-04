import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LimeEvent } from 'src/app/classes/limeEvent';

@Component({
  selector: 'app-event-advertisement',
  templateUrl: './event-advertisement.component.html',
  styleUrls: ['./event-advertisement.component.css'],
})
export class EventAdvertisementComponent {
  event!: LimeEvent;
  showBanner: boolean = false;
  sRegex: RegExp = /s$/i;

  constructor(
    private router: Router,
    private api: ApiService,
  ) {}

  ngOnInit() {
    this.api.getAdvertisedEvent().subscribe((next) => {

      this.event = next[0];

      if(this.event)
        this.showBanner = true;

      const date: Date = new Date(this.event.eventDate);
      if (date.toISOString() === this.event.eventDate) {
        this.event.eventDate = date.toLocaleString();
      }
    });
  }

  seeEvent() {
    this.router.navigate(['/event-info-page'], {
      queryParams: { id: this.event._id },
    });
  }
}
