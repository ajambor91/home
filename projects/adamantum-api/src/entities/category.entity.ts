import { EntityClass } from "../core/abstract/entity.abstract";
import { required } from "../core/decorators/entity.decorator";
import { PostTypes } from "shared-types";
import {CategoryDTO} from "../data-transfer-objects/category.dto";

export class CategoryEntity extends EntityClass {
  categoryId?: number | null;
  @required
  categoryName?: string | null;
  categoryParent?: number | null;
  @required
  createdAt?: Date;
  deletedAt?: Date | null;

  constructor(dto: CategoryDTO) {
    super();
    this.categoryId = dto.categoryId;
    this.categoryName = dto.categoryName;
    this.categoryParent = dto.categoryParent;
    this.createdAt = dto.createdAt;
    this.deletedAt = dto.deletedAt;
  }

  public setCategoryId(categoryId: number): this {
    this.categoryId = categoryId;
    return this;
  }

  public setCategoryName(categoryName: string): this {
    this.categoryName = categoryName;
    return this;
  }

  public setCategoryParent(categoryParent?: number): this {
    this.categoryParent = categoryParent;
    return this;
  }

  public setCreatedAt(createdAt: Date = new Date()): this {
    if (!this.createdAt) {
      this.createdAt = createdAt;
    }
    return this;
  }

  public setDeletedAt(deletedAt?: Date): this {
    this.deletedAt = deletedAt;
    return this;
  }
}
