import {EntityClass} from "../core/abstract/entity.abstract";
import {required} from "../core/decorators/entity.decorator";
import {PostDTO} from "../data-transfer-objects/post.dto";
export  class PostEntity extends EntityClass {
  postId?: number | null;
  @required
  postTitle?: string;
  @required
  postContent?: string;
  fullPath?: string;
  categoryId?: number | null;
  @required
  createdAt?: Date;
  deletedAt?: Date | null;
  categoryName?: string | null;
  parentCategoryName?: string | null;
  constructor(dto: PostDTO) {
    super();
    this.postId = dto.postId;
    this.postTitle = dto.postTitle;
    this.postContent = dto.postContent;
    this.fullPath = dto.fullPath;
    this.categoryId = dto.categoryId;
    this.categoryName = dto.categoryName;
    this.categoryId = dto.categoryId;
    this.parentCategoryName = dto.parentCategoryName;
    this.createdAt = dto.createdAt;
    this.deletedAt = dto.deletedAt;
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

