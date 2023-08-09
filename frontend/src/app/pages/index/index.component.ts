import { Component } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  me!: User;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getMe().subscribe((res) => {
      this.me = res;
    });
  }
}
