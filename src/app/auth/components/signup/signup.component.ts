import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../interfaces/user-api.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private username:string
  private password:string
  private userApiService = undefined
  constructor(private UserApiService: UserApiService) {
    this.userApiService = UserApiService
  }
  onSubmit(){
    this.userApiService.signup(this.username,this.password)
    this.userApiService.userObservable.subscribe(user => {
      console.info('User observable',user)
    })
  }

  ngOnInit() {
  }

}
