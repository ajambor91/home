import {PostEntity} from "../../entities/post.entity";

abstract class PostFactory {
  public createPost(data: any): PostEntity {
    return this.create(data)
  }

  public createManyPosts(data: any[]): PostEntity[] {
    return data.map(item => this.create(item))
  }

  protected abstract create(data: any): PostEntity;
}

export class BasicPostFactory extends PostFactory {
  protected create(data: any): PostEntity {
    return new PostEntity({
      postId: data.postId,
      postTitle: data.postTitle,
      fullPath: data.fullPath,
      categoryId: data.categoryId,
      createdAt: new Date(data.createdAt),
    });
  }
}

export class PostViewDetailsFactory extends PostFactory {

  protected create(data: any): PostEntity {
    return new PostEntity({
      postId: data.postId,
      postTitle: data.postTitle,
      postContent: data.postContent,
      createdAt: new Date(data.createdAt),
    });
  }
}
//TODO change categoryParentId to parentCategoryId in database
export class FullPostFactory extends PostFactory {
  protected create(data: any): PostEntity {
    return new PostEntity({
      postId: data.postId,
      postTitle: data.postTitle,
      postContent: data.postContent,
      fullPath: data.fullPath,
      categoryId: data.categoryId || null,
      categoryName: data.categoryName || null,
      parentCategoryName: data.parentCategoryName || null,
      createdAt: new Date(data.createdAt),
      parentCategoryId: data.categoryParentId || null
    });
  }
}

export enum PostFactoryTypes {
  LIST_BASIC_POSTS = 'LIST_BASIC_POSTS',
  TREE_NODE_POSTS = 'TREE_NODE_POSTS',
  POST_VIEW_DETAILS = 'POST_VIEW_DETAILS'
}

export const getPostFactory: (postType: PostFactoryTypes) => PostFactory = (postType: PostFactoryTypes) => {
  let postFactory: PostFactory;
  switch (postType) {
    case PostFactoryTypes.LIST_BASIC_POSTS:
      postFactory = new BasicPostFactory();
      break;
    case PostFactoryTypes.POST_VIEW_DETAILS:
      postFactory = new PostViewDetailsFactory();
      break
    case PostFactoryTypes.TREE_NODE_POSTS:
      postFactory = new FullPostFactory();
      break
  }
  return postFactory;
}
