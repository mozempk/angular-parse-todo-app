import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export abstract class IAuthService {
  abstract signup(username:string, password:string, email?:string):User | void;
  abstract login(username:string,password:string):User | void
  abstract logout(user?:any):boolean
  abstract restore():User | void
  abstract isAuthenticated():boolean
  abstract getObservable():Observable<User>
  abstract getNotificationMessage():Observable<any>
  abstract setNotificationMessage(message?:any):void
}
