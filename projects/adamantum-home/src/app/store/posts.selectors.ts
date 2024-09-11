import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PostTree } from 'shared-types';

export const selectPostsFeature = createFeatureSelector<{ posts: PostTree[] }>('posts');

export const selectAllPosts = createSelector(
  selectPostsFeature,
  (state) => state.posts
);
