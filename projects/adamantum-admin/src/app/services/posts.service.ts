import {Injectable} from "@angular/core";
import {map, Observable, take} from "rxjs";
import {EditPost, NewPost, Posts, PostsTree, PostTree} from "shared-types";
import {ApiService} from "./api.service";
import {PostsApiService} from "../../../../adamantum-api-reqs/src/lib/posts/posts.api.service";
import {PostForm} from "../forms/post-new.form";
import {FormGroup} from "@angular/forms";
import {PostsTreeClass} from "../../../../adamantum-home/src/app/classes/posts-tree.class";

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
    return this._postsApi.getPostsTree$().pipe(map(posts => posts.map<PostTree>(post => new PostsTreeClass(post.categoryId, post.categoryName, post.createdA, post.fullPath, post.parentCategoryName, post.postId, post.postTitle))));
  }
}
