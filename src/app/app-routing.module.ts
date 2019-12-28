import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
// import { SignupComponent } from './auth/components/signup/signup.component'
// import { LogoutComponent } from './auth/components/logout/logout.component';
// import { LoginComponent } from './auth/components/login/login.component';
// import { AuthGuardService } from './auth/services/guards/auth-guard.service';
// import { UnauthGuardService } from './auth/services/guards/unauth-guard.service'
// import { TodosComponent } from './todo/components/todos/todos.component';
// import { AppComponent } from './app.component';
// import { HomeGuardService } from './core/services/guards/home-guard.service';
// import { NewtodoComponent } from './todo/components/newtodo/newtodo.component'

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
