import {createAction, props} from "@ngrx/store";
import {PostsTree, PostTree} from "../../../../adamantum-shared-types";

export const loadPosts = createAction('[Posts] Load Posts');
export const loadPostsSuccess = createAction('[Posts] Load Posts Success', props<{ posts: PostTree[] }>());
export const loadPostsFailure = createAction('[Posts] Load Posts Failure', props<{ error: any }>());

