
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

  constructor(private http: HttpClient) { }

  signUp(firstName:string,lastName:string,type:string){
    return this.http.post<User>(this.apiEndPoint + 'api/users/signup',
    {
      firstName:firstName,
      lastName:lastName,
      type:type
    },
    {
      withCredentials:true
    })
      
  };
  
  
}
