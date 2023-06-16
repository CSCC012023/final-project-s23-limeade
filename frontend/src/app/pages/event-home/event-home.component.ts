import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.css']
})
export class EventHomeComponent {

  events:any;
  largeEvent:any;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getEvents().subscribe((next)=>{
      this.events = next;
      this.updateEventsList();
    });

  }

  updateEventsList(){
    console.log(this.events);
    if(this.events.length > 0){
      this.largeEvent = this.events[0];
      this.events = this.events.slice(1);
    }
    else {
      console.log("No events found");
    }
  }

}
