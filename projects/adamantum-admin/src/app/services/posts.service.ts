import {Injectable} from "@angular/core";
import {Observable, of, take} from "rxjs";
import {NewPost, Posts} from "shared-types";
import {ApiService} from "./api.service";
import {PostsApiService} from "../../../../adamantum-api-reqs/src/lib/posts/posts.api.service";
// import {PostsApiService} from "adamantum-api-reqs";

@Injectable()
export class PostsService {
  constructor(private _api: ApiService, private _postsApi: PostsApiService) {
  }

  public getPosts$(): Observable<Posts> {
    // return of([] as Posts);
    return this._postsApi.getPosts$().pipe(take(1));
  }

  public addPost(post: NewPost): void {
    this._api.addPost$(post).subscribe()
  }
}
