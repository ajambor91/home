import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {map, Observable, of, switchMap, take, tap} from "rxjs";
import {PostEntity, PostsTree, PostTree} from "shared-types";
import {PostsTransformer} from "../transformers/posts.transformer";
import {Store} from "@ngrx/store";
import {selectAllPosts, selectById} from "../store/posts.selectors";
import {PostsApiService} from "../../../../adamantum-api-reqs/src/lib/posts/posts.api.service";
import {PostsTreeClass} from "../classes/posts-tree.class";
import {ParsedPostTree} from "../models/posts-tree.model";
import {loadPost, loadPostSuccess} from "../store/posts.actions";
import {Actions, ofType} from "@ngrx/effects";

@Injectable()
export class PostsService {
  // private _routes: Observable<IApiRoutes> = this.apiService.getRoutes().pipe(shareReplay())

  constructor(private router: Router, private transformer: PostsTransformer, private store: Store, private _postsApi: PostsApiService, private _action$: Actions) {
  }


  public getPostsTree$(): Observable<PostsTree> {
    return this._postsApi.getPostsTree$().pipe(map(posts => posts.map<PostTree>(post => new PostsTreeClass(post.categoryId, post.categoryName, post.createdA, post.fullPath, post.parentCategoryName, post.postId, post.postTitle, post.categoryParentId))));
  }

  public getPosts$(): Observable<ParsedPostTree[] | null> {
    return this.store.select(selectAllPosts).pipe(
      map(res => this.transformer.transform(res)),
    )
  }

  public getPost$(item: ParsedPostTree): Observable<PostEntity> {
    return this._postsApi.getPost$(item.postId)
  }

  public getPostFromStore$(item: ParsedPostTree): Observable<PostEntity | undefined> {
    return this.store.select(selectById(item.postId)).pipe(
      take(1),
      switchMap(article => {

        if (!!article) {
          return of(article);
        } else {
          this.store.dispatch(loadPost({post: item}));
          return this._action$.pipe(
            ofType(loadPostSuccess),
            map(post => post.contentPosts)
          )
        }
      }))
  }


}
