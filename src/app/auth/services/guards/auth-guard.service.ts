import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserApiService } from '../../interfaces/user-api.service'
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  canActivate():boolean {
    if (this.userApiService.isAuthenticated()) return true
    else this.router.navigate(['login']); return false
  }

  private userApiService: UserApiService = undefined;
  private router: Router = undefined;
  constructor(private UserApiService: UserApiService, private Router: Router) {
    this.userApiService = UserApiService;
    this.router = Router;
  }
}
