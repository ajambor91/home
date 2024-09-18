import {Injectable} from "@angular/core";
import {map, Observable, of, switchMap, take} from "rxjs";
import {Post} from "shared-types";
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

  constructor(
    private _transformer: PostsTransformer,
    private _store: Store,
    private _postsApi: PostsApiService,
    private _action$: Actions
  ) {
  }

  public getPostsTree$(): Observable<ParsedPostTree[]> {
    return this._postsApi.getPostsTree$().pipe(
      map(posts =>
        posts.map<Post>(post =>
          new PostsTreeClass(
            post.postId,
            post.postTitle,
            post.createdAt,
            post.deletedAt,
            post.postContent,
            post.fullPath,
            post.categoryId,
            post.categoryName,
            post.parentCategoryName,
            post.parentCategoryId
          )
        )
      ),
      map(res => this._transformer.transform(res) ?? [])
    );
  }

  public getPosts$(): Observable<ParsedPostTree[] | null> {
    return this._store.select(selectAllPosts).pipe(take(1));
  }

  public getPost$(item: ParsedPostTree): Observable<Post> {
    return this._postsApi.getPost$(item.postId as number);
  }

  public getPostFromStore$(item: ParsedPostTree): Observable<Post | undefined> {
    return this._store.select(selectById(item.postId as number)).pipe(
      take(1),
      switchMap(article => {
        if (!!article) {
          return of(article);
        } else {
          this._store.dispatch(loadPost({post: item}));
          return this._action$.pipe(
            ofType(loadPostSuccess),
            map(post => post.contentPosts)
          );
        }
      })
    );
  }
}
