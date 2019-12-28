import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { UnauthGuard } from './guards/unauth.guard';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth', children: [
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [UnauthGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [UnauthGuard]
      },
      {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
