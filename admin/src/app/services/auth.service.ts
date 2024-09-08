import {Injectable} from "@angular/core";
import {User, UserLogin} from "api-types";
import {BehaviorSubject, map, Observable} from "rxjs";
import {ApiService} from "../api/api.service";

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly _userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private readonly _user: Observable<User | null> = this._userSubject.asObservable();
  constructor(private apiService: ApiService) {
  }
  public login(user: UserLogin): void{
     this.apiService.login(user).subscribe(user => {

     });
  }

  public isLogged(): Observable<any> {
    return this._user.pipe(map(user => !!user));
  }
}
