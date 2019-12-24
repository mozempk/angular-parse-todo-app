import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserApiService } from '../../interfaces/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuardService implements CanActivate {
  private userApiService:UserApiService
  private router:Router
  
  canActivate(): boolean{
    if (!this.userApiService.isAuthenticated()) return true;
    else this.router.navigate(['todos']); return false;
  }

  constructor(private Router: Router, private UserApiService: UserApiService) {
    this.router = Router;
    this.userApiService = UserApiService;
  }
}
