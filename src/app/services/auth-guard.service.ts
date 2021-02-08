import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthServiceService) { }

  async canActivate(): Promise<boolean> {
    await Promise.resolve(this.authService.checkJWT());
    if (this.authService.getToken()) {
      return Promise.resolve(true);
    }
    else {
      return Promise.resolve(false);
    }
  }
}

