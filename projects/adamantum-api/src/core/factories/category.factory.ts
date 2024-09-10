import {CategoryEntity} from "../../entities/category.entity";

export class CategoryFactory {
  static createFromDb(result: any): CategoryEntity {
    return new CategoryEntity({
      categoryId: result.categoryId,
      categoryName: result.categoryName,
      categoryParent: result.categoryParent,
      createdAt: new Date(result.createdAt),
      deletedAt: result.deletedAt ? new Date(result.deletedAt) : undefined
    });
  }

  static createManyFromDb(results: any[]): CategoryEntity[] {
    return results.map(result => CategoryFactory.createFromDb(result));
  }
}
