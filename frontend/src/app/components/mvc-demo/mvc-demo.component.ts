import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/classes/user';
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
