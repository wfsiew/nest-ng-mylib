import { Observable, BehaviorSubject, EMPTY, throwError } from 'rxjs';
import { tap, switchMap, catchError, finalize, filter, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.authService.getToken()) {
      return next.handle(request)
        .pipe(tap(() => {},
          (error: any) => {
            if (request.url.indexOf('/o/token') >= 0) {
              throwError(() => error);
            }

            if (error instanceof HttpErrorResponse) {
              if ([401, 403].indexOf(error.status) !== -1) {
                this.authService.clear();
                this.router.navigate(['/login']);
              }
            }
          }
        ));
    }
    
    request = this.applyCredentials(request, this.authService.getToken());

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            case 401:
            case 403:
              return this.handle401Error(request, next);
    
            default:
              return throwError(error);
          }
        })
      );
  }

  applyCredentials(request: HttpRequest<any>, token: string | null) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.authService.getToken()) {
      return this.logoutUser(req, next);
    }
    
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next('');

      return this.authService.refreshToken().pipe(
        switchMap((token: string) => {
          if (token) {
            this.tokenSubject.next(token);
            return next.handle(this.applyCredentials(req, token));
          }

          console.log('logging out due to invalid token');
          return this.logoutUser(req, next);
        }),
        catchError(error => {
          return this.logoutUser(req, next);
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    }

    else {
      if (this.tokenSubject.value === null) {
        return this.logoutUser(req, next);
      }

      return this.tokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          return next.handle(this.applyCredentials(req, token));
        })
      );
    }
  }

  logoutUser(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.clear();
    this.router.navigate(['/login']);
    return EMPTY;
  }
}
