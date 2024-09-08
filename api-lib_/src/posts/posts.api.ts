import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Posts, PostsRoutes} from "api-types";
import {API_URL} from "../api.config";

@Injectable()
export class PostsApi {
  private readonly _apiUrl: string = inject(API_URL);
  constructor(private httpClient: HttpClient) {

  }

  public getRoutes(): Observable<PostsRoutes> {
    return this.httpClient.get<PostsRoutes>(`${this._apiUrl}routes`);
  }

  public getPost(): Observable<Posts> {
    return this.httpClient.get<Posts>(`${this._apiUrl}posts/xxx`)
  }

}
