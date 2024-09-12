import {PostTree} from "shared-types";

export class PostsTreeClass implements PostTree {
  categoryId: number | null;
  categoryName: string | null;
  createdA: string;
  fullPath: string;
  parentCategoryName: string | null;
  postId: number;
  postTitle: string;

  constructor(categoryId: number | null,
              categoryName: string | null,
              createdA: string,
              fullPath: string,
              parentCategoryName: string | null,
              postId: number,
              postTitle: string) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.postTitle = postTitle;
    this.postId = postId;
    this.parentCategoryName = parentCategoryName;
    this.createdA = createdA;
    this.fullPath = fullPath;
  }

}
