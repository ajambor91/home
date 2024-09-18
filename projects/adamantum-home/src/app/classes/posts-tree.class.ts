import {PostTree} from "shared-types";

export class PostsTreeClass implements PostTree {
  public categoryId: number | null;
  public categoryName: string | null;
  public createdAt: string;
  public fullPath: string;
  public parentCategoryName: string | null;
  public postId: number;
  public postTitle: string;
  public categoryParentId: number | null;

  public constructor(
    categoryId: number | null,
    categoryName: string | null,
    createdAt: string,
    fullPath: string,
    parentCategoryName: string | null,
    postId: number,
    postTitle: string,
    categoryParentId: number | null
  ) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.postTitle = postTitle;
    this.postId = postId;
    this.parentCategoryName = parentCategoryName;
    this.createdAt = createdAt;
    this.categoryParentId = categoryParentId;
    this.fullPath = fullPath;
  }
}
