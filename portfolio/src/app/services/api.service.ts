import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IApiRoutes} from "../models/api.model";
import {EnvironmentsService} from "./environments.service";
import {Posts, PostsRoutes} from "api-types";

@Injectable()
export class ApiService {
  private readonly _apiUrl: string = inject(EnvironmentsService).apiUrl;
  constructor(private httpClient: HttpClient) {

  }

  public getRoutes(): Observable<PostsRoutes> {
    return this.httpClient.get<PostsRoutes>(`${this._apiUrl}routes`);
  }

  public getPost(): Observable<Posts> {
    return this.httpClient.get<Posts>(`${this._apiUrl}posts/xxx`)
  }

}
