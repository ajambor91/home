import {BaseBody} from "./base";

export interface UserBase extends BaseBody {
  userId: number;
  userLogin: string;
  userPassword: string;
  userName: string;
  jwt?: string;
  createdAt?: Date;
}

export interface UserDB extends UserBase {
  userId: number | null;
  createdAt?: Date | null;
}

export interface User extends Omit<UserBase, 'userPassword'> {
}

export interface UserRegister extends Omit<UserBase, 'userId'> {
}

export interface UserLogin extends Pick<UserBase, 'userLogin' | 'userPassword'> {
}

export type UserTypes = UserBase | UserRegister | UserLogin | UserDB;
