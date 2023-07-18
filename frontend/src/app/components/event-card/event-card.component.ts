import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent {
  @Input() event: any;

  constructor(private router: Router) {}

  seeEvent() {
    this.router.navigate(['/event-info-page'], {
      queryParams: { id: this.event._id },
    });
  }
}
