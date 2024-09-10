
import {Env} from "../index";
import {RepoClass} from "../core/abstract/repo.abstract";
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY_BY_ID,
  SELECT_ALL_CATEGORIES,
  UPDATE_CATEGORY
} from "../db/categories.sql";
import {CategoryEntity} from "../entities/category.entity";
import {CategoryFactory} from "../core/factories/category.factory";
import {getTimestamp} from "../core/help_functions/functions";

export class CategoryRepository extends RepoClass {
  constructor(private env: Env) {
    super();
  }
  public async getAll(): Promise<CategoryEntity[]> {
    const {results}: any = await this.env.adamantumDb.prepare(SELECT_ALL_CATEGORIES).all();
    return CategoryFactory.createManyFromDb(results);
  }

  public async getById(id: number): Promise<CategoryEntity> {
    const result: any = await this.env.adamantumDb.prepare(GET_CATEGORY_BY_ID).bind(id).first();
    return CategoryFactory.createFromDb(result);
  }

  public async softDeleteById(id: number): Promise<void> {
    await this.env.adamantumDb.prepare(DELETE_CATEGORY).bind(id).run();
  }

  public async updateById(entity: CategoryEntity): Promise<void> {
    const {categoryName} = entity;
    await this.env.adamantumDb.prepare(UPDATE_CATEGORY).bind(categoryName).run();
  }

  public async addNew(entity: CategoryEntity): Promise<void> {
    await this.env.adamantumDb.prepare(ADD_CATEGORY).bind(entity.categoryName, entity.categoryParent, getTimestamp(entity.createdAt)).run();
  }


}
