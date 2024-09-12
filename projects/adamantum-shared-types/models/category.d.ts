import {BaseBody} from "./base";

export interface Category extends BaseBody {
  categoryId: number;
  categoryName: string;
  categoryParent?: number;
  createdAt: Date;
  deletedAt?: Date;
}

export interface CategoryDB extends Category {
  categoryId: number | null;
  categoryParent?: number | null;
  deletedAt?: Date | null;
  categoryName: string | null;
  parentCategoryName: string | null;


}

export interface CategoryForm extends Omit<Category, 'createdAt' | 'deletedAt' | 'categoryId'>, Pick<Partial<Category>, 'categoryId'> {
}

export interface NewCategory extends CategoryForm {
}

export interface EditCategory extends CategoryForm {
}

export interface Categories extends Array<Category> {
}

export interface NewCategory extends Pick<Category, 'categoryName' | 'categoryParent'> {
}

export type CategoryTypes = Category | NewCategory;
