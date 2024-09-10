import { BaseBody } from "./base";

export interface Post extends BaseBody {
    postId: string;
    postTitle: string;
    postContent: string;
    fullPath: string;
  categoryId?: number;
  createdAt: DateTime;
  deletedAt?: DateTime
}

export interface NewPost extends Omit<Post, 'postId' | 'deletedAt' | 'createdAt'>, Partial<Pick<Post, 'categoryId' | 'fullPath'>> {}
export interface PostRoute extends Pick<Post, 'fullPath' | 'category'> {}
export interface PostsRoutes extends Array<Route> {}
export interface Posts extends Array<PostBase> {}

export interface PostEntity extends Omit<Post, 'postId' | 'createdAt'> {
  postId?: string;
  createdAt?: Date;
}
export type PostTypes = Post | NewPost | PostRoute | PostEntity;
