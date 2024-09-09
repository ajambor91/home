import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(): Observable<boolean> {
    console.log('dsdsdasd')
    return this.authService.isLogged().pipe(
      tap(x => console.log(x)),
      map(user => !!user),
      map((isLogged: boolean) => {
        console.log('logged', isLogged)
        if (isLogged) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
