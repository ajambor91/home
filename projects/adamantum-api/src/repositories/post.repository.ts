import {PostEntity} from "../entities/post.entity";
import {Env} from "../index";
import {RepoClass} from "../core/abstract/repo.abstract";
import {ADD_POST, DELETE_POST, GET_POST_BY_ID, GET_POSTS_LIST, SELECT_ALL_POSTS, UPDATE_POST} from "../db/posts.sql";
import {getTimestamp} from "../core/help_functions/functions";
import {getPostFactory, PostFactoryTypes} from "../core/factories/post.factory";
export class PostRepository extends RepoClass {
  constructor(private env: Env) {
    super();
  }

  public async getAll(): Promise<PostEntity[]> {
    const {results}: any = await this.env.adamantumDb.prepare(SELECT_ALL_POSTS).all();
    return getPostFactory(PostFactoryTypes.LIST_BASIC_POSTS).createManyPosts(results);
  }

  public async getById(id: number): Promise<PostEntity> {
    const result: any = await this.env.adamantumDb.prepare(GET_POST_BY_ID).bind(id).first();
    return getPostFactory(PostFactoryTypes.POST_VIEW_DETAILS).createPost(result);
  }

  public async softDeleteById(id: number): Promise<void> {
    await this.env.adamantumDb.prepare(DELETE_POST).bind(getTimestamp(new Date()), id).run();
  }

  public async updateById(entity: PostEntity): Promise<void> {
    const {postContent, postTitle, categoryId, postId} = entity;
    let postCategoryId: number | undefined | null = categoryId;
    if (!categoryId) {
      postCategoryId = null;
    }
    await this.env.adamantumDb.prepare(UPDATE_POST).bind(postTitle, postContent, postCategoryId, postId).run();
  }

  public async addNew(entity: PostEntity): Promise<void> {
    await this.env.adamantumDb.prepare(ADD_POST).bind(entity.postTitle, entity.postContent, entity.fullPath, entity.categoryId, getTimestamp(entity.createdAt)).run();
  }

  public async getPostsList(): Promise<PostEntity[]> {
    const {results}: any = await this.env.adamantumDb.prepare(GET_POSTS_LIST).all();
    return getPostFactory(PostFactoryTypes.TREE_NODE_POSTS).createManyPosts(results);
  }
}
