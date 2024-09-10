import {UserBase} from "shared-types";
import {UserEntity} from "../entities/user.entity";
import {UserTypes, UserDB} from 'shared-types';
export interface UserDTO extends Partial<UserDB>{
}
export const mapUserDTOToEntity = (dto: UserTypes): UserEntity => {
  const userId: number | null = 'userId' in dto ? dto.userId : null
  const userName: string | undefined = 'userName' in dto ? dto.userName : undefined;
  const createdAt: Date = 'createdAt' in dto && typeof dto.createdAt === 'number' ? new Date(dto.createdAt) : new Date();
  return new UserEntity({
    userId: userId as null,
    userName: userName,
    userLogin: dto.userLogin,
    userPassword: dto.userPassword,
    createdAt: createdAt
  });
};
