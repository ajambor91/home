import {EntityClass} from "../core/abstract/entity.abstract";
import {Category} from "shared-types"
export class CategoryEntity extends EntityClass implements Category{
  public categoryId: number | null = null;
  public categoryName: string | null = null;
  public categoryParentId: number | null = null;
  public createdAt: Date = new Date();
  public deletedAt: Date | null = null;
  public parentCategoryName: string | null = null;

  constructor(dto: CategoryEntity) {
    super();
    this.categoryId = dto.categoryId ?? null;
    this.categoryName = dto.categoryName ?? null;
    this.categoryParentId = dto.categoryParentId ?? null;
    this.createdAt = dto.createdAt ?? new Date();
    this.deletedAt = dto.deletedAt ?? null;
    this.parentCategoryName = dto.parentCategoryName ?? null;
  }


  public setCategoryId(categoryId: number): this {
    this.categoryId = categoryId;
    return this;
  }

  public setCategoryName(categoryName: string): this {
    this.categoryName = categoryName;
    return this;
  }

  public setCategoryParent(categoryParentId: number): this {
    this.categoryParentId = categoryParentId;
    return this;
  }

  public setCreatedAt(createdAt: Date = new Date()): this {
    if (!this.createdAt) {
      this.createdAt = createdAt;
    }
    return this;
  }

  public setDeletedAt(deletedAt: Date): this {
    this.deletedAt = deletedAt;
    return this;
  }
}
