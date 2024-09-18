import {BaseBody} from "./base";

export interface Post extends BaseBody {
  postId: number | null;
  postTitle: string | null;
  postContent?: string | null;
  fullPath?: string | null;
  categoryId?: number | null;
  createdAt: Date | null;
  deletedAt?: Date | null;
  categoryName?: string | null;
  parentCategoryName?: string | null;
  parentCategoryId?: number | null;
}

export type NewPost = Pick<Post, 'postTitle' | 'postContent' | 'categoryId'>;

export type EditPost = Pick<Post, 'postId' | 'postContent' | 'postTitle' | 'categoryId'>;
// export interface PostTree {
//   postId: number;
//   postTitle: string;
//   fullPath: string;
//   categoryId: number | null;
//   categoryName: string | null;
//   parentCategoryName: string | null;
//   parentCategoryId: number | null;
//   createdAt: string;
// }

// export type PostsTree = Array<PostTree>;
