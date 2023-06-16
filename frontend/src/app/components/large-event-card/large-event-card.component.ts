import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-large-event-card',
  templateUrl: './large-event-card.component.html',
  styleUrls: ['./large-event-card.component.css']
})
export class LargeEventCardComponent {

  @Input() event:any;

  constructor(private router:Router) { }

  seeEvent(){

    this.router.navigate(
      ['/event-info-page'], { queryParams: { id: this.event._id } }
    ); 
  }
}
