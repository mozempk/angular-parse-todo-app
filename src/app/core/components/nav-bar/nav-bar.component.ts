import { Component, OnInit } from '@angular/core';
import { NavItemsService, NavItem } from '../../services/nav-items.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private title:string = 'Home'
  private navItems:NavItem[]
  constructor(navItemsService: NavItemsService) {
    navItemsService.getObservable().subscribe(items => {
      this.navItems = items
      // console.info('navItems',items)
    })
  }

  ngOnInit() {
  }

}
