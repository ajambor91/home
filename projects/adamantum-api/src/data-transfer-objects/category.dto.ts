import { CategoryTypes } from "shared-types";
import { CategoryEntity } from "../entities/category.entity";
import {CategoryDB} from 'shared-types';

export interface CategoryDTO extends Partial<CategoryDB> {}
export const mapCategoryDTOToEntity = (dto: CategoryTypes): CategoryEntity => {
  const categoryId: number | null = 'categoryId' in dto ? dto.categoryId : null;
  const createdAt: Date  = 'createdAt' in dto ? typeof dto.createdAt === 'number' ? new Date(dto.createdAt) : dto.createdAt : new Date();
  const deletedAt: Date | null = 'deletedAt' in dto ? typeof dto.deletedAt === 'number' ? new Date(dto.deletedAt) : dto.createdAt as Date : null;
  const categoryName: string | null = 'categoryName' in dto && typeof dto.categoryName !== 'undefined' ? dto.categoryName : null;
  const categoryParent: number | null = 'categoryParent' in dto && typeof dto.categoryParent !== 'undefined' ? dto.categoryParent : null;
  return new CategoryEntity({
    categoryId: categoryId,
    categoryName: categoryName,
    categoryParent: categoryParent,
    createdAt: createdAt,
    deletedAt: deletedAt,
  });
};
