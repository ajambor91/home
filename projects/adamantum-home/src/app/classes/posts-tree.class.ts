import {Post} from "shared-types";

export class PostsTreeClass implements Post {
  public postId: number | null;
  public postTitle: string | null;
  public postContent?: string | null;
  public fullPath?: string | null;
  public categoryId: number | null;
  public createdAt: Date | null;
  public deletedAt?: Date | null;
  public categoryName: string | null;
  public parentCategoryName: string | null;
  public parentCategoryId: number | null;

  public constructor(
    postId: number | null,
    postTitle: string | null,
    createdAt: Date | null,
    deletedAt?: Date | null,
    postContent?: string | null,
    fullPath?: string | null,
    categoryId?: number | null,
    categoryName?: string | null,
    parentCategoryName?: string | null,
    parentCategoryId?: number | null
  ) {
    this.postId = postId;
    this.postTitle = postTitle;
    this.postContent = postContent;
    this.fullPath = fullPath;
    this.categoryId = categoryId ?? null;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
    this.categoryName = categoryName ?? null;
    this.parentCategoryName = parentCategoryName ?? null;
    this.parentCategoryId = parentCategoryId ?? null;
  }
}

