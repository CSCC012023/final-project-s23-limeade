import { Component } from '@angular/core';

@Component({
  selector: 'app-large-event-card',
  templateUrl: './large-event-card.component.html',
  styleUrls: ['./large-event-card.component.css']
})
export class LargeEventCardComponent {
  seeEvent(){
    window.location.href = "/event-info-page";
  }
}
