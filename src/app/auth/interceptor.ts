import { Injectable } from "@angular/core";
import { HttpUserEvent } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import { HttpProgressEvent } from "@angular/common/http";
import { HttpHeaderResponse } from "@angular/common/http";
import { HttpSentEvent } from "@angular/common/http";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthGuardService} from './auth-guard.service';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, take, switchMap, finalize, tap, map, retry} from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private authService: AuthGuardService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const customReq = request.clone({

    });
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.logoutUser();
        //return this.handle401Error(request, next);
      } 
        return throwError(error);
    }));
   
  }
  //private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //  if (!this.isRefreshing) {
  //    this.isRefreshing = true;
  //    this.refreshTokenSubject.next(null);
       
  //    return this.authService.refreshToken().pipe(
  //      switchMap((token: any) => {
  //        this.isRefreshing = false;
  //        this.refreshTokenSubject.next(token.data.authToken);
  //        return next.handle(this.addToken(request, token.data.authToken));
  //      }));

  //  } else {
  //    return this.refreshTokenSubject.pipe(
  //      filter(token => token != null),
  //      take(1),
  //      switchMap(jwt => {
  //        return next.handle(this.addToken(request, jwt));
  //      }));
  //  }
  //}
 
  //handle400Error(error) {
  //  if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
  //    // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
  //    return this.logoutUser();
  //  }

  //  return Observable.throw(error);
  //}

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  logoutUser() {
    // Route to the login page (implementation up to you)

    return this.authService.logoutUser();
  }

}
