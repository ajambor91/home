import {Injectable} from "@angular/core";
import {User, UserLogin} from "shared-types";
import {BehaviorSubject, map, Observable, shareReplay} from "rxjs";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "./local-storage.service";

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly _userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private readonly _user: Observable<User | null> = this._userSubject.asObservable().pipe(shareReplay(1));
  constructor(private _apiService: ApiService, private _router: Router, private _localStorageService: LocalStorageService) {
  }
  public login(user: UserLogin): void{
    this._apiService.login$(user).subscribe(user => {
      if(!!user) {
        this._userSubject.next(user);
        this._localStorageService.setUser(user);
        this._router.navigate([''])

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
    return this._user.pipe(map(user => !!user));
  }

  public loginByStorage(): void {
    const user: User | null = this._localStorageService.getUser();
    if (!!user) {
      this._userSubject.next(user);
      this._router.navigate(['']);
    }
  }
}
