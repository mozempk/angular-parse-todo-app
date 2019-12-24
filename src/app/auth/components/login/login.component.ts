import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../interfaces/user-api.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username:string
  private password:string
  private userApiService:UserApiService = undefined
  constructor(UserApiService: UserApiService) {
    this.userApiService = UserApiService
  }

  onSubmit(){
    console.info('Submitting user for login',this.username)
    this.userApiService.login(this.username,this.password)
  }

  ngOnInit() {
  }

}
