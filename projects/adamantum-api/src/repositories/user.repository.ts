import {Env} from "../index";
import {RepoClass} from "../core/abstract/repo.abstract";
import {UserEntity} from "../entities/user.entity";
import {
  DELETE_USER,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_LOGIN,
  INSERT_USER,
  UPDATE_USER_BY_ID
} from "../db/users.sql";
import {getTimestamp} from "../core/help_functions/functions";

export class UserRepository extends RepoClass {
  constructor(private env: Env) {
    super();
  }

  public async getUserByLogin(): Promise<UserEntity> {
    const userEntity: any = await this.env.adamantumDb.prepare(GET_USER_BY_LOGIN).first();
    return userEntity as UserEntity;
  }


  public async addNew(user: UserEntity): Promise<void> {
    await this.env.adamantumDb.prepare(INSERT_USER).bind(user.userName, user.userLogin, user.userPassword, getTimestamp(user.createdAt as Date)).run();
  }

  public async getAll(): Promise<UserEntity[]> {
    const {results}: any = await this.env.adamantumDb.prepare(GET_ALL_USERS).all();
    return results as UserEntity[];
  }

  public async getById(id: number): Promise<UserEntity> {
    const user: any = this.env.adamantumDb.prepare(GET_USER_BY_ID).bind(id).first();
    return user as UserEntity;
  }

  public async softDeleteById(id: number): Promise<void> {
    await this.env.adamantumDb.prepare(DELETE_USER).bind(id).run();
  }

  public async updateById(entity: UserEntity): Promise<void> {
    await this.env.adamantumDb.prepare(UPDATE_USER_BY_ID).bind(entity.userLogin, entity.userPassword).run()
  }

}
