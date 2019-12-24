import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { UserApiService } from './interfaces/user-api.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { UnauthGuardService } from './services/guards/unauth-guard.service';


@NgModule({
  declarations: [LoginComponent, LogoutComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: UserApiService,
      useClass: AuthService
    },
    AuthGuardService,
    UnauthGuardService
  ]
})
export class AuthModule { }
