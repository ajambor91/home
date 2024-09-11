import {CategoryEntity} from "../../entities/category.entity";

// export class CategoryFactory {
//   static createFromDb(result: any): CategoryEntity {
//     return new CategoryEntity({
//       categoryId: result.categoryId,
//       categoryName: result.categoryName,
//       categoryParent: result.categoryParent,
//       createdAt: new Date(result.createdAt),
//       deletedAt: result.deletedAt ? new Date(result.deletedAt) : undefined
//     });
//   }
//
//   static createManyFromDb(results: any[]): CategoryEntity[] {
//     return results.map(result => CategoryFactory.createFromDb(result));
//   }
// }

abstract class CategoryFactory {
  public createCategory(data: any): CategoryEntity {
    return this.create(data) as CategoryEntity;
  }

  public createMany(data: any[]): CategoryEntity[] {
    return data.map(item => this.create(item)) as CategoryEntity[]
  }

  protected abstract create(data: any): CategoryEntity;
}

export class BasicCategory extends CategoryFactory {
  public createCategory(data: any): CategoryEntity {
    return this.create(data);
  }

  public createMany(data: any[]): CategoryEntity[] {
    return data.map(item => this.create(item))
  }

  protected create(data: any): CategoryEntity {
    return new CategoryEntity({
      categoryId: data.categoryId,
      createdAt: data.createdAt,
      categoryName: data.categoryName,
      categoryParent: data.categoryParent
    });
  }
}

export class CategoryWithParents extends CategoryFactory {
  public createCategory(data: any): CategoryEntity {
    return this.create(data);
  }

  public createMany(data: any[]): CategoryEntity[] {
    return data.map(item => this.create(item))
  }

  protected create(data: any): CategoryEntity {
    return new CategoryEntity({
      categoryId: data.categoryId,
      createdAt: data.createdAt,
      categoryName: data.categoryName,
      categoryParent: data.categoryParent,
      parentCategoryName: data.parentCategoryName
    });
  }
}

export enum CategoryFactoryTypes {
  BASIC_CATEGORY = 'BASIC_CATEGORY',
  CATEGORY_WITH_PARENTS = 'CATEGORY_WITH_PARENTS'
}

export const getCategoryFactory: (categoryType: CategoryFactoryTypes) => CategoryFactory = (categoryType: CategoryFactoryTypes) => {
  let category: CategoryFactory;
  switch (categoryType) {
    case CategoryFactoryTypes.BASIC_CATEGORY:
      category = new BasicCategory();
      break;
    case CategoryFactoryTypes.CATEGORY_WITH_PARENTS:
      category = new CategoryWithParents();
      break;
  }
  return category;
}
