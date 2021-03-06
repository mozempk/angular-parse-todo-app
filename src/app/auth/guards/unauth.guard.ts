import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { IAuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

  constructor(private router: Router, private authService: IAuthService) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['todos']);
    return false;
  }
}
