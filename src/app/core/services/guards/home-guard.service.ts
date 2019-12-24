import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserApiService } from '../../../auth/interfaces/user-api.service'
@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {
  private userApiService: UserApiService
  private router: Router

  canActivate(): boolean {
    if (this.userApiService.isAuthenticated()) {
      this.router.navigate(['todos'])
      return true
    }
    else {
      this.router.navigate(['login'])
      return true
    }
  }

  constructor(Router: Router, UserApiService:UserApiService) {
    this.userApiService = UserApiService
    this.router = Router
  }
}
