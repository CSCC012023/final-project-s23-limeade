import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { InvitationServiceService } from './services/invitation-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService,private invitesNotis:InvitationServiceService) {}
  ngOnInit(): void {
    this.api.getMe().subscribe(
      (next) => {
        this.api.loggedIn = true;
        this.api.userId = next._id;
        this.api.type = next.type;
        this.invitesNotis.initiate();
      },
      (error) => {
        this.api.loggedIn = false;
        this.api.userId = '';
        this.api.type = '';
        localStorage.setItem('loggedin','false');
        localStorage.setItem('userId','');
        localStorage.setItem('type','');
        this.api.signOut().subscribe();
        this.invitesNotis.close();
      }
    );
  }
  title = 'frontend';
}
