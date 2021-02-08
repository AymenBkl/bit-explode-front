import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { StorageServiceService } from './storage-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
    private authService: AuthServiceService,
    private storageService: StorageServiceService,
    private activatedRouter: ActivatedRoute) { }

  async canActivate(): Promise<boolean> {
    await Promise.resolve(this.authService.checkJWT('sa'));
    if (this.authService.getToken()) {
      console.log("here")
      return Promise.resolve(true);
    }
    else {
      console.log("hereee",this.storageService.getCurrentHash().hashId)
      this.navigateHome();
      return Promise.resolve(true);
    }
  }


  navigateHome() {
    this.router.navigate([], {
      relativeTo: this.activatedRouter,
      queryParams: {
        url: this.storageService.getCurrentHash().hashId
      },
      queryParamsHandling: 'merge',
    });

  }
}

