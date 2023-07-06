import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-info-page',
  templateUrl: './event-info-page.component.html',
  styleUrls: ['./event-info-page.component.css'],
})
export class EventInfoPageComponent {
  event: any;
  id: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.api.getEventById(params['id']).subscribe((next) => {
        this.event = next;
        this.api.getUserById(this.event.userId).subscribe((next) => {
          this.event.user = next;
          this.update();
        });
      });
    });
  }

  update() {}
}
