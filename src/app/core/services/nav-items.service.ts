import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserApiService } from 'src/app/auth/interfaces/user-api.service';
import { Router } from '@angular/router';

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
  private userApiService:UserApiService
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
        link: 'new'
      }),
      new NavItem({
        text:'Logout',
        active: false,
        link: 'logout'
      }),
    ],
    unauthenticated: [
      new NavItem({
        text:'Signup',
        active: false,
        link: 'signup'
      }),
      new NavItem({
        text:'Login',
        active: false,
        link: 'login'
      })
    ]
  }
  constructor(private UserApiService: UserApiService, router: Router) {
    this.userApiService = UserApiService
    this.userApiService.getObservable().subscribe(user => {
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
