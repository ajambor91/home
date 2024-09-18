import {EntityClass} from "../core/abstract/entity.abstract";
import {required} from "../core/decorators/entity.decorator";
import {Post } from  "shared-types"
export class PostEntity extends EntityClass implements Post{
  postId: number | null;
  @required
  postTitle: string | null;
  @required
  postContent?: string | null;
  fullPath?: string | null;
  categoryId?: number | null;
  @required
  createdAt: Date | null;
  deletedAt?: Date | null;
  categoryName?: string | null;
  parentCategoryName?: string | null;
  parentCategoryId?: number | null;

  constructor(data: Post) {
    super();
    this.postId = data.postId ?? null;
    this.postTitle = data.postTitle ?? null;
    this.postContent = data.postContent ?? null;
    this.fullPath = data.fullPath ?? null;
    this.categoryId = data.categoryId ?? null;
    this.categoryName = data.categoryName ?? null;
    this.parentCategoryName = data.parentCategoryName ?? null;
    this.createdAt = data.createdAt ?? null;
    this.deletedAt = data.deletedAt ?? null;
    this.parentCategoryId = data.parentCategoryId ?? null;

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

  public setCategoryId(categoryId: number): this {
    this.categoryId = categoryId;
    return this;
  }

  public setCreatedAt(createdAt: Date = new Date()): this {
    if (!this.createdAt) {
      this.createdAt = createdAt;
    }
    return this;
  }

  public setDeletedAt(deletedAt: Date): this {
    this.deletedAt = deletedAt;
    return this;
  }

}

