export interface ParsedPostTree {
  createdAt: Date | null;
  postId: number | null;
  postTitle: string | null;
  fullPath?: string | null;
  categoryId?: null | number;
  categoryName?: string | null
  parentCategoryName?: string | null;
  parentCategoryId?: number | null;
  children?: ParsedPostTree[];
}

