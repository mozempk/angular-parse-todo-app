import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../interfaces/user-api.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  private userApiService = undefined
  constructor(private UserApiService: UserApiService) {
    this.userApiService = UserApiService
  }

  logout() {
    this.userApiService.logout()
  }

  ngOnInit() {
  }

}
