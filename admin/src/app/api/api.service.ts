import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "api-types";
import {Observable} from "rxjs";
import {EnvironmentsService} from "../services/environments.service";

@Injectable({providedIn: 'root'})
export class ApiService {
  private readonly _apiUrl: string = inject(EnvironmentsService).apiUrl;
  constructor(private httpClient: HttpClient) {
  }

  public login(user: UserLogin): Observable<any> {
    return this.httpClient.post(`${this._apiUrl}users/login`, user);
  }
}
