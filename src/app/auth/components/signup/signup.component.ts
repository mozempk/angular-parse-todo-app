import { Component, OnInit } from '@angular/core';
import { IAuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private username:string
  private password:string

  constructor(private authService: IAuthService) {}

  onSubmit(){
    this.authService.signup(this.username,this.password)
    this.authService.getObservable().subscribe(user => {
      console.info('User observable',user)
    })
  }

  ngOnInit() {
  }

}
