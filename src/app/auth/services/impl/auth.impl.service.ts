import { Injectable } from '@angular/core';
import Parse from 'parse'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { IAuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
  getObservable(): import("rxjs").Observable<User> {
    return this.userObservable
  }
  private router:Router

  isAuthenticated(): boolean {
    let authenticated = false
    this.userObservable.subscribe(user => {
      user.name !== undefined ? authenticated = true : authenticated = false
    })
    console.info('isAuthenticated: ',authenticated)
    return authenticated
  }
  restore(): User {
    let _user = Parse.User.current()
    let user = new User()
    if (_user ) {
      user.name = _user.get('username')
      user.id = _user.id
      user._user = _user
      this.userSubject.next(user)
      return user
    }
    return user
  }
  signup(username: string, password: string, email?: string): User {
    let parseUser = new Parse.User()
    let user = new User()
    parseUser.set('username',username)
    parseUser.set('password',password)
    email ? parseUser.set('email',email) : null
    parseUser.signUp()
      .then((_user: Parse.User) => {
        user._user = _user
        user.name = _user.get('username')
        user.id = _user.id
        this.userSubject.next(user)
        console.info('user successfully signed up: ',user)
        this.router.navigate(['/todos'])
        return user
      })
      .catch((e: any) => {
        console.error('Cannot signup user',e)
      })
      console.info("returning",user)
      return user
  }
  login(username: string, password: string): User {
    let parseUser = new Parse.User()
    let user = new User()
    Parse.User.logIn(username,password)
      .then(_user => {
        user._user = _user
        user.name = _user.get('username')
        user.id = _user.id
        this.userSubject.next(user)
        this.router.navigate(['/todos'])
        return user
      })
      .catch(e => {
        console.error('Error logging in user',e)
        return undefined
      })
    return user
  }
  logout(user?: any): boolean {
    let v = false
    Parse.User.logOut()
      .then(success => {
        console.info('successfully logged out')
        v = true
        this.userSubject.next(new User)
        this.router.navigate([''])
      })
      .catch(e => {
        console.error('couldnt log out user')
        v = false
      })
      return v
  }

  private userSubject = new BehaviorSubject<User>(new User())
  //can improve, use getter function for userObservable
  public userObservable = this.userSubject.asObservable()
  constructor(Router: Router) {
    this.router = Router
    Parse.initialize(environment.parseAppId)
    Parse.serverURL = environment.parseServerURL
    this.restore()
  }
}
