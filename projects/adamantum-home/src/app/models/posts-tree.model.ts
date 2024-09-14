export interface ParsedPostTree {
  createdA: string;
  postId: number;
  postTitle: string;
  fullPath: string;
  categoryId: null | number;
  categoryName: string | null
  parentCategoryName: string | null;
  categoryParentId: number | null;
  children?: ParsedPostTree[];
}

