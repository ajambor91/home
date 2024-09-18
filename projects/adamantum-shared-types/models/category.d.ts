import {BaseBody} from "./base";

export interface Category extends BaseBody {
  categoryId: number | null;
  categoryName: string | null;
  parentCategoryId?: number | null;
  createdAt: Date | null;
  deletedAt: Date | null;
  parentCategoryName?: string | null;
}

export type NewCategory = Pick<Category, 'categoryName' | 'parentCategoryId'>;
export type EditCategory = Pick<Category, 'categoryId' |'categoryName' | 'parentCategoryId'>
