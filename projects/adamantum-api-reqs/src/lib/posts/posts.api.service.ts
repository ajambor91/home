import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from 'shared-types';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {

  constructor(private httpClient: HttpClient) {
  }

  public getPostsTree$(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`http://127.0.0.1:8787/api/posts-tree`)
  }

  public getPosts$(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`http://127.0.0.1:8787/api/posts`)
  }

  public getPost$(postId: number): Observable<Post> {
    return this.httpClient.get<Post>(`http://127.0.0.1:8787/api/posts/${postId}`)
  }
}
