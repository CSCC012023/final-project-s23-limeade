import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable, Subscription, last } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LimeEvent } from '../classes/limeEvent';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiEndPoint = environment.apiEndpoint;
  loggedIn: boolean = false;
  userId: string = '';
  type: string = '';

  constructor(private http: HttpClient) {
    this.loggedIn = localStorage.getItem('loggedin') === 'true';
    this.userId = localStorage.getItem('userId') || '';
    this.type = localStorage.getItem('type') || '';
  }

  signUp(
    firstName: string,
    lastName: string,
    type: string,
    password: string,
    username: string
  ): Observable<User> {
    return this.http.post<User>(
      this.apiEndPoint + '/api/users/signup',
      {
        username: username,
        firstName: firstName,
        lastName: lastName,
        type: type,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
  }

  signIn(username: string, password: string): Observable<User> {
    return this.http.post<User>(
      this.apiEndPoint + '/api/users/login',
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
  }

  signOut(): Observable<{ message: string }> {
    this.loggedIn = false;
    this.userId = '';
    this.type = '';
    return this.http.get<{ message: string }>(
      this.apiEndPoint + '/api/users/logout',
      {
        withCredentials: true,
      }
    );
  }

  deleteInvite(inviteId: string) {
    return this.http.delete<any>(
      this.apiEndPoint + `/api/invites/id=${inviteId}`,
      { withCredentials: true }
    );
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(
      this.apiEndPoint + `/api/users/username=${username}`,
      { withCredentials: true }
    );
  }

  getMe(): Observable<User> {
    return this.http.get<User>(this.apiEndPoint + '/api/users/getMe', {
      withCredentials: true,
    });
  }

  switchToPremium() {
    return this.http.patch<any>(
      this.apiEndPoint + '/api/users/switchToPremium',
      {},
      { withCredentials: true }
    );
  }

  switchToBasic() {
    return this.http.patch<any>(
      this.apiEndPoint + '/api/users/switchToBasic',
      {},
      { withCredentials: true }
    );
  }

  updateUserInfo(): void {
    this.getMe().subscribe((next) => {
      this.loggedIn = true;
      this.userId = next._id;
      this.type = next.type;
    });
  }

  getUserById(userId: string): Observable<User> {
    if (!this.loggedIn) {
      return new Observable((observer) => {
        observer.error('Not logged in');
      });
    }

    return this.http.get<User>(this.apiEndPoint + `/api/users/id=${userId}`, {
      withCredentials: true,
    });
  }

  patchProfile(
    userId: string,
    firstName: string,
    lastName: string,
    interests: string[]
  ): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(
      this.apiEndPoint + '/api/users/profile',
      {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        interests: interests,
      },
      { withCredentials: true }
    );
  }

  joinEvent(eventId: string, userId: string): Observable<LimeEvent> {
    return this.http.patch<LimeEvent>(
      this.apiEndPoint + '/api/events/joinEvent',
      { eventId: eventId, userId: userId },
      { withCredentials: true }
    );
  }

  leaveEvent(eventId: string, userId: string): Observable<LimeEvent> {
    return this.http.patch<LimeEvent>(
      this.apiEndPoint + '/api/events/leaveEvent',
      { eventId: eventId, userId: userId },
      { withCredentials: true }
    );
  }

  editEvent(
    eventId: string,
    eventName: string,
    eventDescription: string,
    eventDate: string,
    eventLocation: string,
    eventTypes: string[],
    eventCost: string,
    advertise: boolean = false
  ): Observable<LimeEvent> {
    return this.http.patch<LimeEvent>(
      this.apiEndPoint + `/api/events/id=${eventId}`,
      {
        eventName: eventName,
        eventDescription: eventDescription,
        eventDate: eventDate,
        eventLocation: eventLocation,
        eventTypes: eventTypes,
        eventCost: eventCost,
        advertise: advertise,
      },
      { withCredentials: true }
    );
  }

  userSearch(queryString: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiEndPoint + `/api/users/usersearch/queryString=${queryString}`,
      { withCredentials: true }
    );
  }

  submitChatReport(
    reportedUsername: string,
    messageTxt: string,
    optionalMsgString: string
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      this.apiEndPoint + `/api/users/report`,
      {
        reportMsg: messageTxt,
        reportedUsername: reportedUsername,
        messageTxt: optionalMsgString,
      },
      {
        withCredentials: true,
      }
    );
  }

  submitProfileReport(
    reportedUsername: string,
    messageTxt: string
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      this.apiEndPoint + `/api/users/report`,
      {
        reportMsg: messageTxt,
        reportedUsername: reportedUsername,
      },
      {
        withCredentials: true,
      }
    );
  }

  blockUser(userId: string): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(
      this.apiEndPoint + `/api/users/block`,
      { blockedUserId: userId },
      { withCredentials: true }
    );
  }

  unblockUser(userId: string): Observable<{ message: string }> {
    return this.http.patch<{ message: string }>(
      this.apiEndPoint + `/api/users/unblock`,
      { blockedUserId: userId },
      { withCredentials: true }
    );
  }

  getInterests(): Observable<string[]> {
    return this.http.get<string[]>(this.apiEndPoint + '/api/users/interests', {
      withCredentials: true,
    });
  }

  addEvent(
    eventName: string,
    eventDescription: string,
    eventDate: string,
    eventLocation: string,
    eventTypes: string[],
    userId: string,
    eventCost: string,
    advertise: boolean
  ): Observable<LimeEvent> {
    return this.http.post<LimeEvent>(
      this.apiEndPoint + '/api/events',
      {
        eventName: eventName,
        eventDescription: eventDescription,
        eventDate: eventDate,
        eventLocation: eventLocation,
        eventTypes: eventTypes,
        eventCost: eventCost,
        advertise: advertise,
        userId: userId,
      },
      { withCredentials: true }
    );
  }

  createQueryString(filter: string, param: string, value: string | string[]) {
    if (value !== '' && JSON.stringify(value) !== '[]') {
      if (filter === '') {
        filter = '?';
      } else {
        filter += '&';
      }
      if (typeof value === 'string') {
        filter += param + '=' + value;
      } else {
        filter += param + '=' + value.join('_');
      }
    }
    return filter;
  }

  getEvents(
    userId: string = '',
    sort: string[] = [],
    eventDateMin: string = '',
    eventDateMax: string = '',
    eventLocation: string = '',
    eventTypes: string[] = []
  ): Observable<LimeEvent[]> {
    let filter = this.createQueryString('', 'userId', userId);
    filter = this.createQueryString(filter, 'sort', sort);
    filter = this.createQueryString(filter, 'eventDateMin', eventDateMin);
    filter = this.createQueryString(filter, 'eventDateMax', eventDateMax);
    filter = this.createQueryString(filter, 'eventLocation', eventLocation);
    filter = this.createQueryString(filter, 'eventTypes', eventTypes);
    return this.http.get<LimeEvent[]>(
      this.apiEndPoint + '/api/events/' + filter,
      {
        withCredentials: true,
      }
    );
  }

  getRecommendedEvents(): Observable<LimeEvent[]> {
    return this.http.get<LimeEvent[]>(
      this.apiEndPoint + '/api/events/recommended',
      {
        withCredentials: true,
      }
    );
  }

  getAdvertisedEvent(): Observable<LimeEvent[]> {
    return this.http.get<LimeEvent[]>(
      this.apiEndPoint + '/api/events/advertised',
      {
        withCredentials: true,
      }
    );
  }

  getEventsByName(
    eventName: string,
    allEvents: boolean
  ): Observable<LimeEvent[]> {
    let filter = allEvents
      ? ''
      : this.createQueryString('', 'userId', this.userId);

    return this.http.get<LimeEvent[]>(
      this.apiEndPoint +
        '/api/events/eventSearch/queryString=' +
        eventName +
        '/' +
        filter,
      {
        withCredentials: true,
      }
    );
  }

  getEventById(eventId: string): Observable<LimeEvent> {
    return this.http.get<LimeEvent>(
      this.apiEndPoint + '/api/events/' + eventId,
      {
        withCredentials: true,
      }
    );
  }
}
