import { BaseBody } from "./base";

export interface UserBase extends BaseBody {
    userId: number;
    userLogin: string;
    userPassword: string;
    userName: string;
}
export interface User extends Omit<UserBase, 'userPassword'> {}
export interface UserRegister extends Omit<UserBase, 'userId'> {}
export interface UserLogin extends Pick<UserBase, 'userLogin' , 'userPassword'> {}
