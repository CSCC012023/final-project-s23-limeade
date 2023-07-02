import { Component } from '@angular/core';

@Component({
  selector: 'app-usersearch',
  templateUrl: './usersearch.component.html',
  styleUrls: ['./usersearch.component.css']
})
export class UsersearchComponent {

  searchQuery:string = '';
  searchResults:any[] = [];

  search(){
    console.log(this.searchQuery);
  }
}
