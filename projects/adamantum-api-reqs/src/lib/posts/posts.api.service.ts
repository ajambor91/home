import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostEntity, Posts, PostsTree} from 'shared-types';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {

  constructor(private httpClient: HttpClient) {
  }

  public getPostsTree$(): Observable<PostsTree> {
    return this.httpClient.get<PostsTree>(`http://127.0.0.1:8787/api/posts-tree`)
  }

  public getPosts$(): Observable<Posts> {
    return this.httpClient.get<Posts>(`http://127.0.0.1:8787/api/posts`)
  }

  public getPost$(postId: number): Observable<PostEntity> {
    return this.httpClient.get<PostEntity>(`http://127.0.0.1:8787/api/posts/${postId}`)
  }
}
