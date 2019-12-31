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
      this.setNotificationMessage({'type':'success','message':'Welcome back '+user.name+'!'})
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
        this.setNotificationMessage({'type':'success','message':'Welcome '+user.name+'!'})
        this.router.navigate(['/todos'])
        return user
      })
      .catch((e: any) => {
        this.setNotificationMessage({'type':'error','message':'An error occurred: '+ e})
        //console.error('Cannot signup user',e)
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
        this.setNotificationMessage({'type':'success','message':'Welcome '+user.name+'!'})
        return user
      })
      .catch(e => {
        this.setNotificationMessage({'type':'error','message':'An error occurred: '+ e})
        //console.error('Error logging in user',e)
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
        this.setNotificationMessage({'type':'success','message':'Bye!'})
        this.router.navigate([''])
      })
      .catch(e => {
        this.setNotificationMessage({'type':'error','message':'An error occurred: '+ e})
        //console.error('couldnt log out user')
        v = false
      })
      return v
  }

  getNotificationMessage(){
    return this.notificationMessageObservable
  }

  setNotificationMessage(message?:any){
    message ? this.notificationMessageSubject.next(message) : this.notificationMessageSubject.next(undefined) 
  }
  
  private notificationMessageSubject = new BehaviorSubject<any>(undefined)
  private notificationMessageObservable = this.notificationMessageSubject.asObservable()
  private userSubject = new BehaviorSubject<User>(new User())
  private userObservable = this.userSubject.asObservable()
  constructor(Router: Router) {
    this.router = Router
    Parse.initialize(environment.parseAppId)
    Parse.serverURL = environment.parseServerURL
    this.restore()
  }
}
