import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private inj: Injector,
              private authService: AuthServiceService,
              ) { 
              }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    
    const authReq = req.clone({ headers: req.headers.set('Authorization', 'bearer ' + authToken) });
    console.log("here",authReq.headers.keys(),authToken);
      return next.handle(authReq);
  }
}

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private inj: Injector,
              private authService: AuthServiceService,
              private storageService: StorageServiceService) { 
              }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    console.log("here");
    return next
      .handle(req)
      .pipe(tap((event: HttpEvent<any>) => {
        // do nothing
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 && authToken) {
            this.authService.checkJWT(this.storageService.getCurrentHash().hashId);
          }
        }
      }));
    
  }
}




