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

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }

  demo(){
    this.api.signUp("Random","User","basic","password",this.generateRandomString(10)).subscribe({
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
