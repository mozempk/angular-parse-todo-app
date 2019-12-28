import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { IAuthService } from './services/auth.service';
import { AuthService } from './services/impl/auth.impl.service';
import { UnauthGuard } from './guards/unauth.guard';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService
    },
    AuthGuard,
    UnauthGuard
  ]
})
export class AuthModule { }
