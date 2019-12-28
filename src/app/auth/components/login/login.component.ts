import { Component, OnInit } from '@angular/core';
import { IAuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username:string
  private password:string

  constructor(private authService: IAuthService) {}

  onSubmit(){
    console.info('Submitting user for login',this.username)
    this.authService.login(this.username,this.password)
  }

  ngOnInit() {
  }

}
