import { Component } from '@angular/core';
import { User } from '../../classes/user';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-mvc-demo',
  templateUrl: './mvc-demo.component.html',
  styleUrls: ['./mvc-demo.component.css']
})
export class MvcDemoComponent {

  generatedUser:User ;
  constructor(private api:ApiService){
    this.generatedUser = new User('','','');
  }
  demo(){
    this.api.signUp("Random","User","basic").subscribe({
      next:(value)=>{
        console.log(value);
        this.generatedUser = value;

      },
      error:(err)=>{
        console.log(err); 
      }
    });
  }
}
