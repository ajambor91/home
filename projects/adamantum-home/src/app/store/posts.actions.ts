import {createAction, props} from "@ngrx/store";
import {PostEntity, PostTree} from "../../../../adamantum-shared-types";
import {ParsedPostTree} from "../models/posts-tree.model";

export const loadPosts = createAction('[Posts] Load Posts');
export const loadPostsSuccess = createAction('[Posts] Load Posts Success', props<{ posts: ParsedPostTree[] }>());
export const loadPostsFailure = createAction('[Posts] Load Posts Failure', props<{ error: any }>());

export const loadPost = createAction('[Posts] Load Post', props<{ post: ParsedPostTree }>());
export const loadPostSuccess = createAction('[Posts] Load Post Success', props<{ contentPosts: PostEntity }>());
export const loadPostFailure = createAction('[Posts] Load Post Failure', props<{ error: any }>());

