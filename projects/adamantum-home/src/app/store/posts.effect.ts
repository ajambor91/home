import {loadPost, loadPosts, loadPostsFailure, loadPostsSuccess, loadPostSuccess} from "./posts.actions";
import {Actions, createEffect, ofType} from "@ngrx/effects";

import {catchError, map, mergeMap, switchMap} from "rxjs";
import {inject} from "@angular/core";
import {PostsTree} from "../../../../adamantum-shared-types";
import {PostsService} from "../services/posts.service";

export const loadPostsEffect = createEffect(
  (actions$: Actions = inject(Actions), postsService: PostsService = inject(PostsService)) => {
    return actions$.pipe(
      ofType(loadPosts),
      mergeMap(() => postsService.getPostsTree$().pipe(
        map((posts: PostsTree) => loadPostsSuccess({posts})),
        catchError(error => [loadPostsFailure({error})])
      ))
    )
  }, {functional: true});


export const loadPostContentEffect = createEffect(
  (action$: Actions = inject(Actions), postsService: PostsService = inject(PostsService)) => {
    return action$.pipe(
      ofType(loadPost),
      switchMap((post) => postsService.getPost$(post.post).pipe(
        map((postContent => loadPostSuccess({contentPosts: postContent}))),
        catchError(error => [loadPostsFailure({error})])
      ))
    )
  }, {functional: true}
)
