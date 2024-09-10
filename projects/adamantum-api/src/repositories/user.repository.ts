
import {PostEntity} from "../entities/post.entity";
import {Env} from "../index";
import {RepoClass} from "../core/abstract/repo.abstract";
import {ADD_POST, DELETE_POST, GET_POST_BY_ID, SELECT_ALL_POSTS, UPDATE_POST} from "../db/posts.sql";

export class UserRepository extends RepoClass {
  constructor(private env: Env) {
    super();
  }
  public async getAll(): Promise<PostEntity[]> {
    const { results}: any = await this.env.adamantumDb.prepare(SELECT_ALL_POSTS).all();
    return results as PostEntity[];
  }

  public async getById(id: number): Promise<PostEntity> {
    const result: any = await this.env.adamantumDb.prepare(GET_POST_BY_ID).bind(id).first();
    return result as PostEntity;
  }

  public async softDeleteById(id: number): Promise<void> {
    await this.env.adamantumDb.prepare(DELETE_POST).bind(id).run();
  }

  public async updateById(entity: PostEntity): Promise<void> {
    const {postContent, postTitle} = entity;
    await this.env.adamantumDb.prepare(UPDATE_POST).bind(postTitle, postContent).run();
  }

  public async addNew(entity: PostEntity): Promise<void> {
    await this.env.adamantumDb.prepare(ADD_POST).bind(entity.postTitle, entity.postContent, entity.fullPath, entity.categoryId, entity.categoryId).run();
  }

}
