import {BaseBody} from "./base";


export interface NewPost extends Omit<Post, 'postId'> {}
export interface Post extends BaseBody{
    postId: string
    postTitle: string;
    postContent: string;
    fullPath: string;
    category: string
}

export interface PostRoute extends Pick<Post, 'fullPath' | 'category'>{
    
}
export interface PostsRoutes extends Array<Route> {}
export interface Posts extends Array<Post> {}