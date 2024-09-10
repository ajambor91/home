import {Injectable} from "@angular/core";
import {Observable, of, take} from "rxjs";
import {CategoryForm, NewPost, Posts} from "shared-types";
import {ApiService} from "./api.service";
import {PostsApiService} from "../../../../adamantum-api-reqs/src/lib/posts/posts.api.service";
// import {PostsApiService} from "adamantum-api-reqs";

@Injectable()
export class CategoriesService {
  constructor(private _api: ApiService) {
  }

  public getCategories$(): Observable<Posts> {
    // return of([] as Posts);
    return this._api.getCategories$();
  }

  public addCategory(category: CategoryForm): void {
    this._api.addCategory$(category).subscribe()
  }
}
