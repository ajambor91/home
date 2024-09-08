import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {map, Observable, withLatestFrom} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";
@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  private readonly _unguardedRoutes: string[] = [
    '/api/posts',
    '/api/users/add'
  ];
  constructor(private authService: AuthService) {
  }
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      withLatestFrom(this.authService.getCurrentUser()),
      map(([handler, user]) => {
        let newRequest: HttpRequest<any> = req;
        if (user && !!user.jwt) {
          newRequest.clone({
            setHeaders: {
              Authorization: `Bearer ${user.jwt}`
            }
          })
        }
        return next.handle(newRequest);
      })
    )
  }
}
