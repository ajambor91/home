import {createReducer, on} from "@ngrx/store";
import {loadPostsSuccess, loadPostSuccess} from "./posts.actions";
import {PostEntity, PostsTree} from "../../../../adamantum-shared-types";
import {ParsedPostTree} from "../models/posts-tree.model";

const initialState: PostState = {
  posts: [],
  contentPosts: [],
  error: null
}

export interface PostState {
  posts: ParsedPostTree[];
  contentPosts: PostEntity[];
  error: any;
}

export const postReducer = createReducer(
  initialState,
  on(loadPostsSuccess, (state, {posts}) => ({...state, posts})),
  on(loadPostSuccess, (state, {contentPosts}) => {
    const postIndex = state.contentPosts.findIndex(post => post.postId === contentPosts.postId);

    if (postIndex !== -1) {
      const updatedContentPosts = [...state.contentPosts];
      updatedContentPosts[postIndex] = {
        ...updatedContentPosts[postIndex],
        ...contentPosts
      };

      return {
        ...state,
        contentPosts: updatedContentPosts
      };
    }
    const newPostsArray: PostEntity[] = [...state.contentPosts, contentPosts]
    return {
      ...state,
      contentPosts: newPostsArray
    };
  })
)
