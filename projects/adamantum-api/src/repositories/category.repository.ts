import {Env} from "../index";
import {RepoClass} from "../core/abstract/repo.abstract";
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY_BY_ID,
  GET_CATEGORY_TREE,
  SELECT_ALL_CATEGORIES,
  UPDATE_CATEGORY
} from "../db/categories.sql";
import {CategoryEntity} from "../entities/category.entity";
import {CategoryFactoryTypes, getCategoryFactory} from "../core/factories/category.factory";
import {getTimestamp} from "../core/help_functions/functions";

export class CategoryRepository extends RepoClass {
  constructor(private env: Env) {
    super();
  }

  public async getAll(): Promise<CategoryEntity[]> {
    const {results}: any = await this.env.adamantumDb.prepare(SELECT_ALL_CATEGORIES).all();
    return getCategoryFactory(CategoryFactoryTypes.BASIC_CATEGORY).createMany(results);
  }

  public async getById(id: number): Promise<CategoryEntity> {
    const result: any = await this.env.adamantumDb.prepare(GET_CATEGORY_BY_ID).bind(id).first();
    return getCategoryFactory(CategoryFactoryTypes.BASIC_CATEGORY).createCategory(result);
  }

  public async softDeleteById(id: number): Promise<void> {
    await this.env.adamantumDb.prepare(DELETE_CATEGORY).bind(getTimestamp(new Date()), id).run();
  }

  public async updateById(entity: CategoryEntity): Promise<void> {
    const {categoryName} = entity;
    await this.env.adamantumDb.prepare(UPDATE_CATEGORY).bind(categoryName).run();
  }

  public async addNew(entity: CategoryEntity): Promise<void> {
    await this.env.adamantumDb.prepare(ADD_CATEGORY).bind(entity.categoryName, entity.categoryParent, getTimestamp(entity.createdAt)).run();
  }

  public async getCategoriesTree(): Promise<CategoryEntity[]> {
    const {results}: any = await this.env.adamantumDb.prepare(GET_CATEGORY_TREE).all();
    return getCategoryFactory(CategoryFactoryTypes.CATEGORY_WITH_PARENTS).createMany(results);
  }


}
