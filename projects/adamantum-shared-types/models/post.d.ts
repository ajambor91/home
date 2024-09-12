import {BaseBody} from "./base";

export interface Post extends BaseBody {
  postId: number;
  postTitle: string;
  postContent: string;
  fullPath: string;
  categoryId?: number;
  createdAt: Date;
  deletedAt?: Date;
}

export interface PostDB extends Post {
  postId: number | null;
  categoryId?: number | null;
  deletedAt?: Date | null
  categoryName?: string | null
  parentCategoryName?: string | null,
}

export interface NewPost extends Omit<Post, 'postId' | 'deletedAt' | 'createdAt'>, Partial<Pick<Post, 'categoryId' | 'fullPath'>> {
}

export interface EditPost extends Partial<NewPost>, Pick<Post, 'postId'> {
}

export interface PostRoute extends Pick<Post, 'fullPath' | 'category'> {
}

export interface PostsRoutes extends Array<Route> {
}

export interface Posts extends Array<PostBase> {
}

export interface PostEntity extends Omit<Post, 'postId' | 'createdAt'> {
  postId?: number;
  createdAt?: Date;
}

export interface PostTree {
  createdA: string;
  postId: number;
  postTitle: string;
  fullPath: string;
  categoryId: null | number;
  categoryName: string | null
  parentCategoryName: string | null
}

export interface PostsTree extends Array<PostTree> {
}

export type PostTypes = Post | NewPost | PostEntity | PostDB;
