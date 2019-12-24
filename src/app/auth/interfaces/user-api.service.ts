import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class User {
  id: string
  name: string
  _user: any
}

@Injectable({
  providedIn: 'root'
})

export abstract class UserApiService {
  abstract signup(username:string, password:string, email?:string):User;
  abstract login(username:string,password:string):User
  abstract logout(user?:any):boolean
  abstract restore():User
  abstract isAuthenticated():boolean
  abstract getObservable():Observable<User>
}
