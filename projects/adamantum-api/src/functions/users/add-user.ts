import { HttpRequest } from "../../core/router/types";
import { UserRegister } from "shared-types";
import { createResponse, hashPassword } from "../../core/help_functions/functions";
import { INTERNAL_SERVER_ERROR_RESPONSE, OK_RESPONSE } from "../../core/router/default-responses";

export const addUser = async (request: HttpRequest<UserRegister>): Promise<Response> => {
  try {
    const { userLogin, userPassword, userName }: UserRegister = request.body;
    const hashedPassword: string = await hashPassword(userPassword, userName);
    await request.env.adamantumDb.prepare('INSERT INTO users (userName, userLogin, userPassword) VALUES (?, ?, ?)').bind(userName, userLogin, hashedPassword).run();
    return createResponse(OK_RESPONSE);
  } catch (e) {
    console.log(e);
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
  }
};
