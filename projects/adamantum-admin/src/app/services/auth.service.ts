import {Injectable} from "@angular/core";
import {User, UserLogin} from "shared-types";
import {BehaviorSubject, map, Observable, shareReplay} from "rxjs";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly _userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private readonly _user: Observable<User | null> = this._userSubject.asObservable().pipe(shareReplay(1));
  constructor(private apiService: ApiService, private _router: Router) {
  }
  public login(user: UserLogin): void{
    this.apiService.login$(user).subscribe(user => {
      if(!!user) {
        this._userSubject.next(user);
        this._router.navigate(['main'])

      }
    });
  }

  public logout(): void {
    this._userSubject.next(null);
  }

  public getCurrentUser(): Observable<User | null> {
    return this._user;
  }

  public isLogged(): Observable<boolean> {
    console.log('NIE MA',this._userSubject.value)
    return this._user.pipe(map(user => !!user));
  }
}
