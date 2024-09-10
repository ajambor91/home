import { HttpRequest } from "../../core/router/types";
import { UserRegister } from "shared-types";
import {createResponse, getRepository, hashPassword} from "../../core/help_functions/functions";
import { INTERNAL_SERVER_ERROR_RESPONSE, OK_RESPONSE } from "../../core/router/default-responses";
import {UserRepository} from "../../repositories/user.repository";
import {UserEntity} from "../../entities/user.entity";
import {mapUserDTOToEntity} from "../../data-transfer-objects/user.dto";

export const addUser = async (request: HttpRequest<UserRegister>): Promise<Response> => {
  try {
    console.log('request.body', request.body)
    const userEntity: UserEntity = mapUserDTOToEntity(request.body)
    console.log(userEntity)
    const hashedPassword: string = await hashPassword(userEntity.userPassword as string, userEntity.userName as string);

    userEntity.setUserPassword(hashedPassword)
    const userRepo: UserRepository = getRepository(UserRepository, request.env)

    await userRepo.addNew(userEntity);
    return createResponse(OK_RESPONSE);
  } catch (e) {
    console.log(e);
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
  }
};
