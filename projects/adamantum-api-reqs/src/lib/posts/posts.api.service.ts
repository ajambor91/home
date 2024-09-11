import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Posts} from 'shared-types';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {

  constructor(private httpClient: HttpClient) {
  }

  // public getPosts$(): Observable<Posts> {
  //   return this.httpClient.get<Posts>(`${this._apiUrl}posts`)
  // }
  //
  public getPosts$(): Observable<Posts> {
    return this.httpClient.get<Posts>(`http://127.0.0.1:8787/api/posts`)
  }
}
