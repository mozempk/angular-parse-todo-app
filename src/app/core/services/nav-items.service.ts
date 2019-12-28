import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IAuthService } from 'src/app/auth/services/auth.service';

export class NavItem {
  text: string
  icon?: string | any
  active: boolean
  link: string
  constructor(params?:any){
    this.text = params.text || ''
    params.icon? this.icon = params.icon : null
    this.active = params.active || false
    this.link = params.link
  }
}

@Injectable({
  providedIn: 'root'
})
export class NavItemsService {
  private navItemsSubject:BehaviorSubject<NavItem[]> = new BehaviorSubject([])
  private navItemsObservable:Observable<NavItem[]> = this.navItemsSubject.asObservable()
  private itemsSet = 'unauthenticated'
  private navItems = {
    authenticated: [
      new NavItem({
        text:'Todos',
        active: false,
        link: 'todos'
      }),
      new NavItem({
        text:'New',
        active: false,
        link: 'todos/new'
      }),
      new NavItem({
        text:'Logout',
        active: false,
        link: 'auth/logout'
      }),
    ],
    unauthenticated: [
      new NavItem({
        text:'Signup',
        active: false,
        link: 'auth/signup'
      }),
      new NavItem({
        text:'Login',
        active: false,
        link: 'auth/login'
      })
    ]
  }
  constructor(private authService: IAuthService, router: Router) {
    this.authService.getObservable().subscribe(user => {
      console.info(user)
      if (user.name !== undefined) {
        this.itemsSet = 'authenticated';
        console.info('navItems, user is auth')
      }
      else this.itemsSet = 'unauthenticated'
    })

    router.events.subscribe((url:any) => {
      if (url.url) {
        let s = url.url.substr(1).toUpperCase()
        for (let item of this.navItems[this.itemsSet]){
          if (s === item.text.toUpperCase()) item.active = true
          else item.active = false
        }
        this.navItemsSubject.next(this.navItems[this.itemsSet])
      }
    });
  }
  getObservable():Observable<NavItem[]>{
    return this.navItemsObservable
  }
}
