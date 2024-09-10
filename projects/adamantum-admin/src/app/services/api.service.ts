import {inject, Injectable} from "@angular/core";
import {EnvironmentsService} from "./environments.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryForm, NewPost, Posts, UserLogin} from "shared-types";


@Injectable({providedIn: 'root'})
export class ApiService {
  private readonly _apiUrl: string = inject(EnvironmentsService).apiUrl;
  constructor(private httpClient: HttpClient) {
  }

  public login$(user: UserLogin): Observable<any> {
    return this.httpClient.post(`${this._apiUrl}users/login`, user);
  }

  public addPost$(post: NewPost): Observable<void> {
    return this.httpClient.post<void>(`${this._apiUrl}post`,post)
  }

  public addCategory$(category: CategoryForm): Observable<void> {
    return this.httpClient.post<void>(`${this._apiUrl}categories/add`,category)

  }

  public getCategories$(): Observable<any> {
    return this.httpClient.get(`${this._apiUrl}categories`)
  }
}
