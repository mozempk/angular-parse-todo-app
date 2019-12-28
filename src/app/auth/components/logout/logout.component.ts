import { Component, OnInit } from '@angular/core';
import { IAuthService } from '../../services/auth.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {

  constructor(private authService: IAuthService) {}

  logout() {
    this.authService.logout()
  }

  ngOnInit() {
  }

}
