import {EntityClass} from "../core/abstract/entity.abstract";
import {required} from "../core/decorators/entity.decorator";
import {UserDTO} from "../data-transfer-objects/user.dto";

export class UserEntity extends EntityClass {
  userId?: number | null;
  @required
  userName?: string;
  @required
  userLogin?: string;
  userPassword?: string;
  @required
  createdAt?: Date;

  constructor(dto: UserDTO) {
    super();
    this.userId = dto.userId ?? 0;
    this.userLogin = dto.userLogin;
    this.userPassword = dto.userPassword;
    this.userName = dto.userName;
    this.createdAt = dto.createdAt ? new Date(dto.createdAt) : new Date();
  }

  public setUserId(userId: number): this {
    this.userId = userId;
    return this;
  }

  public setUserName(userName: string): this {
    this.userName = userName;
    return this;
  }

  public setUserLogin(userLogin: string): this {
    this.userLogin = userLogin;
    return this;
  }

  public setUserPassword(userPassword: string): this {
    this.userPassword = userPassword;
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
