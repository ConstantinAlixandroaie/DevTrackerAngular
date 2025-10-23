import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean |UrlTree{
    if (this.authService.isAuthenticated()) {
      return true;
    }
    return this.router.createUrlTree(['auth/login'],{
      queryParams: { returnUrl: this.router.url }
    });
  }
}
