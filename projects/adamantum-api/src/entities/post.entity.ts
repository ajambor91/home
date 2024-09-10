import {EntityClass} from "../core/abstract/entity.abstract";
import {required} from "../core/decorators/entity.decorator";
import {PostTypes} from "shared-types";
export  class PostEntity extends EntityClass {
  postId?: number;
  @required
  postTitle?: string;
  @required
  postContent?: string;
  fullPath?: string;
  categoryId?: number;
  @required
  createdAt?: Date;
  deletedAt?: Date;

  constructor(post: PostTypes) {
    super(post);

  }

  public setPostId(postId: number): this {
    this.postId = postId;
    return this;
  }

  public setPostTitle(postTitle: string): this {
    this.postTitle = postTitle;
    return this;
  }

  public setPostContent(postContent: string): this {
    this.postContent = postContent;
    return this;
  }

  public setFullPath(fullPath: string): this {
    this.fullPath = fullPath;
    return this;
  }

  public setCategoryId(categoryId?: number): this {
    this.categoryId = categoryId;
    return this;
  }

  public setCreatedAt(createdAt: Date = new Date()): this {
    if (!this.createdAt) {
      this.createdAt = createdAt;
    }
    return this;
  }

  public setDeletedAt(deletedAt?: Date): this {
    this.deletedAt = deletedAt;
    return this;
  }

}

