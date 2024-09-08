import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(): Observable<boolean> {
    return this.authService.isLogged().pipe(
      map((isLogged: boolean) => {
        if (isLogged) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
