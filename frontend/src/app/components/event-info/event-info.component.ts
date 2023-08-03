import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LimeEvent } from 'src/app/classes/limeEvent';
import { User } from 'src/app/classes/user';
import { InvitationServiceService } from 'src/app/services/invitation-service.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css'],
})
export class EventInfoComponent {
  @Input() event!: LimeEvent;
  @Input() user!: User;
  userJoined: boolean = false;
  userInterestedUsernames: string[] = [];
  interestedUsers: any[] = [];
  permanentInterestedUsers: any[] = [];
  sRegex: RegExp = /s$/i;
  invUsername: string = '';
  inviteError: string = '';
  inviteFeedback: string = '';
  showFilterForm: boolean = false;

  constructor(
    private api: ApiService,
    private invitationService: InvitationServiceService,
    private library: FaIconLibrary
  ) {
    library.addIcons(faSliders);
  }

  ngOnInit(): void {
    if (this.event.interestedUsers.includes(this.api.userId)) {
      this.userJoined = true;
    }

    this.event.interestedUsers.forEach((userId: string) => {
      this.api.getUserById(userId).subscribe((next) => {
        this.userInterestedUsernames.push(next.username);
        this.interestedUsers.push(next);
        this.permanentInterestedUsers.push(next);
      });
    });

    const date: Date = new Date(this.event.eventDate);
    if (date.toISOString() === this.event.eventDate) {
      this.event.eventDate = date.toLocaleString();
    }
  }

  joinEvent() {
    this.interestedUsers = [...this.permanentInterestedUsers];
    this.api.joinEvent(this.event._id, this.api.userId).subscribe((next) => {
      this.userJoined = true;
      this.api.getUserById(this.api.userId).subscribe((next) => {
        this.interestedUsers.push(next);
        this.userInterestedUsernames.push(next.username);
        this.permanentInterestedUsers = [...this.interestedUsers];
      });
    });
  }

  leaveEvent() {
    this.interestedUsers = [...this.permanentInterestedUsers];
    this.api.leaveEvent(this.event._id, this.api.userId).subscribe((next) => {
      this.userJoined = false;
      this.api.getUserById(this.api.userId).subscribe((next) => {
        this.userInterestedUsernames = this.userInterestedUsernames.filter(
          (username) => username != next.username
        );
        this.interestedUsers = this.interestedUsers.filter(
          (user) => user.username != next.username
        );
        this.permanentInterestedUsers = [...this.interestedUsers];
      });
    });
  }

  sendInvite() {
    console.log('invited username: ' + this.invUsername);
    console.log('event_id: ' + this.event._id);
    this.api.getUserByUsername(this.invUsername).subscribe(
      (next) => {
        console.log('user: ', next);
        const user = next;
        this.invitationService.sendInvite(user._id, this.event._id).subscribe(
          (next) => {
            console.log(next);
            this.inviteFeedback = 'Invitation sent!';
            this.inviteError = '';
          },
          (error) => {
            console.log(error);
            this.inviteError = error.error.error;
          }
        );
      },
      (error) => {
        console.log(error);
        this.inviteError = error.error.error;
      }
    );
  }

  filterUsersByInterest(selectedInterest: any) {
    this.interestedUsers = [...this.permanentInterestedUsers];
    this.interestedUsers = this.interestedUsers.filter((user) =>
      this.isSubset(selectedInterest, user.interests)
    );
  }

  isSubset(subset: any[], superset: any[]) {
    return subset.every((item) => superset.includes(item));
  }
}
