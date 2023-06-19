
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable, Subscription, last } from 'rxjs';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiEndPoint = environment.apiEndpoint;
  loggedIn:boolean = false;
  userId:string = '';
  type:string = '';
  constructor(private http: HttpClient) { }

  signUp(firstName:string,lastName:string,type:string,password:string,username:string){
    return this.http.post<any>(this.apiEndPoint + '/api/users/signup',
    {
      username:username,
      firstName:firstName,
      lastName:lastName,
      type:type,
      password:password
    },
    {
      withCredentials:true
    })
      
  };

  signIn(username:string,password:string){
    return this.http.post<any>(this.apiEndPoint+'/api/users/login',
    {
      username:username,
      password:password,
    },
    {withCredentials:true})
  };

  signOut(){
    return this.http.get(this.apiEndPoint+'/api/users/logout',{withCredentials:true});
  }

  getme(){
    return this.http.get<any>(this.apiEndPoint+'/api/users/getMe',{withCredentials:true});
  }
  
  switchToPremium(){
    if(!(this.loggedIn)){
      return new Observable(observer=>{
        observer.error("Not logged in");
      })
    };

    return this.http.patch(this.apiEndPoint+'/api/users/switchToPremium',{},{withCredentials:true});
  }

  addEvent(eventName:string,eventDescription:string,eventDate:string,eventLocation:string, userId:string){

    return this.http.post(this.apiEndPoint+'/api/events',
    {
      eventName:eventName,
      eventDescription:eventDescription,
      eventDate:eventDate,
      eventLocation:eventLocation,
      userId:userId,
    },
    {withCredentials:true});
  }

  getEvents(){
    return this.http.get(this.apiEndPoint+'/api/events',{withCredentials:true});
  }

  getEventbyId(eventId:string){
    return this.http.get(this.apiEndPoint+'/api/events/'+eventId,{withCredentials:true});
  }
  
}
