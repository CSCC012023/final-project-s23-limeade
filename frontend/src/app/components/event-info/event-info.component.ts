import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css'],
})
export class EventInfoComponent {
  @Input() event: any;
  userJoined: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    
    if(this.event.interestedUsers.includes(this.api.userId)){
      this.userJoined = true;
    }
  }

  joinEvent() {
    this.api
      .joinEvent(this.event._id, this.api.userId)
      .subscribe((next) => {
        this.userJoined = true;
        this.event.interestedUsers.push(this.api.userId);
      });
  }

  leaveEvent() {
    this.api
      .leaveEvent(this.event._id, this.api.userId)
      .subscribe((next) => {
        this.userJoined = false;
        this.event.interestedUsers.splice(this.event.interestedUsers.indexOf(this.api.userId), 1);
      });
  }

}
