import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Posts} from "api-types";
import {PostsApi} from "api-lib";

@Injectable()
class PostsService {
  constructor(private _api: PostsApi) {
  }

  public getPosts$(): Observable<Posts> {
    return this._api.getPost();
  }
}
