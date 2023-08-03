import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-invite-card',
  templateUrl: './invite-card.component.html',
  styleUrls: ['./invite-card.component.css'],
})
export class InviteCardComponent {
  @Input() eventName: string = '';
  @Input() inviterName: string = '';
  @Input() inviteId: string = '';
  @Input() eventId: string = '';
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private router: Router,
    private api: ApiService,
  ) {}
  // Event handler for the visit button
  onVisitClicked(): void {
    // Add your logic for the visit button click here
    this.api.deleteInvite(this.inviteId).subscribe(
      (next) => {
        this.router.navigate(['/event-info-page'], {
          queryParams: { id: this.eventId },
        });
      },
      (error) => {
        console.log(error);
      },
    );
  }

  // Event handler for the decline button
  onDeclineClicked(): void {
    // Add your logic for the decline button click here
    console.log('Decline button clicked!');
    this.delete.emit(this.inviteId);
  }
}
