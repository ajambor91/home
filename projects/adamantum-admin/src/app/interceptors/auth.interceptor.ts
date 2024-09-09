import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {switchMap, take} from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService: AuthService = inject(AuthService);
  return authService.getCurrentUser().pipe(
    take(1),
    switchMap(user => {
      if (!user || !user.jwt) {
        return next(req)
      }
      const newReq = req.clone({
        headers: req.headers.append('Authorization', user?.jwt as string),
      });
      return next(newReq);
    })
  )

}
