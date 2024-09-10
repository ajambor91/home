import {UserEntity} from "../../entities/user.entity";

export class UserFactory {
  static createFromDb(result: any): UserEntity {
    return new UserEntity({
      userId: result.userId,
      userName: result.userName,
      userLogin: result.userLogin,
      userPassword: result.userPassword,
      createdAt: new Date(result.createdAt)
    });
  }

  static createManyFromDb(results: any[]): UserEntity[] {
    return results.map(result => UserFactory.createFromDb(result));
  }
}
