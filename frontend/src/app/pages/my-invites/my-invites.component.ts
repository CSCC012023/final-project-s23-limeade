import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-my-invites',
  templateUrl: './my-invites.component.html',
  styleUrls: ['./my-invites.component.css'],
})
export class MyInvitesComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private api: ApiService,
  ) {
    this.apiEndpoint = environment.apiEndpoint;
  }
  ngOnInit(): void {
    this.http
      .get<any>(this.apiEndpoint + `/api/invites/received`, {
        withCredentials: true,
      })
      .subscribe((next) => {
        this.messages = next;
        console.log(this.messages);
      });
  }
  messages: any[] = [];
  apiEndpoint: string = '';

  handleDelete(inviteId: string) {
    this.api.deleteInvite(inviteId).subscribe((next) => {
      this.messages = this.messages.filter((item) => item._id !== inviteId);
    });
  }
}
