import {Injectable} from "@angular/core";
import {Observable, take} from "rxjs";
import {NewPost, Posts} from "shared-types";
import {ApiService} from "./api.service";

@Injectable()
export class PostsService {
  constructor(private _api: ApiService) {
  }

  public getPosts$(): Observable<Posts> {
    return this._api.getPosts$().pipe(take(1));
  }

  public addPost(post: NewPost): void {
    this._api.addPost$(post).subscribe()
  }
}
