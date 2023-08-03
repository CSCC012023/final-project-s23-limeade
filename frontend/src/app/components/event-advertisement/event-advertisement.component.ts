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
  sRegex: RegExp = /s$/i;

  constructor(
    private router: Router,
    private api: ApiService,
  ) {}

  ngOnInit() {
    this.api.getAdvertisedEvent().subscribe((next) => {
      this.event = next[0];
    });
  }

  seeEvent() {
    this.router.navigate(['/event-info-page'], {
      queryParams: { id: this.event._id },
    });
  }
}
