import {Injectable} from "@angular/core";
import {Observable, take} from "rxjs";
import {EditPost, NewPost, Posts, PostsTree} from "shared-types";
import {ApiService} from "./api.service";
import {PostsApiService} from "../../../../adamantum-api-reqs/src/lib/posts/posts.api.service";
import {PostForm} from "../forms/post-new.form";
import {FormGroup} from "@angular/forms";

// import {PostsApiService} from "adamantum-api-reqs";

@Injectable()
export class PostsService {
  constructor(private _api: ApiService, private _postsApi: PostsApiService) {
  }

  public getPosts$(): Observable<Posts> {
    return this._postsApi.getPosts$().pipe(take(1));
  }

  public addPost(post: NewPost): void {
    this._api.addPost$(post).subscribe()
  }

  public editPost(post: EditPost): void {
    this._api.editPost$(post).subscribe()
  }

  public deletePost(id: number): void {
    this._api.deletePost$(id).subscribe()
  }

  public getPost(id: number, form: FormGroup<PostForm>): void {
    this._api.getPost(id).subscribe(result => {
      form.patchValue(result);
    });
  }

  public getPostsTree$(): Observable<PostsTree> {
    return this._postsApi.getPostsTree$();
  }
}
