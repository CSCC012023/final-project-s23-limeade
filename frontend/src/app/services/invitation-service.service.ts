import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class InvitationServiceService {
  private socket!: WebSocket;
  apiUri: string = '';
  constructor(private http: HttpClient) {
    this.apiUri = environment.apiEndpoint;
  }

  initiate() {
    this.socket = new WebSocket('ws://localhost:3000/invitenotis');
    this.socket.onmessage = (event) => {
      console.log('message recieved');
      const message = JSON.parse(event.data);
      console.log(message);
      alert(
        `A user with name: ${message.inviterId.firstName} ${message.inviterId.lastName} with username: ${message.inviterId.username} just invited you to an event called ${message.eventId.eventName}. Go to your invites to accept or decline.`,
      );
    };
  }

  sendInvite(invitedId: string, eventId: string) {
    return this.http.post(
      this.apiUri + `/api/invites`,
      { invitedId: invitedId, eventId: eventId },
      { withCredentials: true },
    );
  }

  close() {
    this.socket.close();
  }
}
