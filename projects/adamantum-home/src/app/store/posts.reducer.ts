import {createReducer, on} from "@ngrx/store";
import {loadPostsSuccess} from "./posts.actions";
import {PostsTree} from "../../../../adamantum-shared-types";

const initialState:{
  posts: PostsTree,
  error: any
} = {
  posts: [],
  error: null
}

export const postReducer = createReducer(
  initialState,
  on(loadPostsSuccess, (state, {posts}) => ({...state, posts}))
)
