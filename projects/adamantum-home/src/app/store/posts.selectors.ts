import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PostState} from "./posts.reducer";

export const selectPostsFeature = createFeatureSelector<PostState>('posts');
export const selectAllPosts = createSelector(
  selectPostsFeature,
  (state) => state.posts
);

export const selectById = (postdId: number) => createSelector(
  selectPostsFeature,
  (state) => state.contentPosts.find(post => post.postId === postdId)
)
