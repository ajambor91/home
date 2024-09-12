import {loadPosts, loadPostsFailure, loadPostsSuccess} from "./posts.actions";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostsService} from "../../../../adamantum-admin/src/app/services/posts.service";
import {catchError, map, mergeMap, tap} from "rxjs";
import {inject} from "@angular/core";
import {PostsTree} from "../../../../adamantum-shared-types";

export const loadPostsEffect = createEffect(
  (actions$: Actions = inject(Actions), postsService: PostsService = inject(PostsService)) => {
    return actions$.pipe(
      ofType(loadPosts),
      tap(x => console.log(x)),
      mergeMap(() => postsService.getPostsTree$().pipe(
        map((posts: PostsTree) => loadPostsSuccess({posts})),
        catchError(error => [loadPostsFailure({error})])
      ))
    )
  }, {functional: true});


