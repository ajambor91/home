export interface ParsedPostTree {
  createdA: string;
  postId: number;
  postTitle: string;
  fullPath: string;
  categoryId: null | number;
  categoryName: string | null
  parentCategoryName: string | null;
  children?: ParsedPostTree[];
}

