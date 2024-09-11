import {HttpRequest} from "../../core/router/types";
import {User, UserBase, UserLogin} from "shared-types";
import {createResponse, generateJWT, hashPassword} from "../../core/help_functions/functions";
import {INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE} from "../../core/router/default-responses";
import {OK_CODE} from "../../core/router/http-statuses";

export async function loginUser(request: HttpRequest<UserLogin>): Promise<Response> {
  try {
    const {userLogin, userPassword}: UserLogin = request.body;

    const user: UserBase = await request.env.adamantumDb.prepare('SELECT * FROM users WHERE userLogin = ?').bind(userLogin).first() as UserBase;
    if (!user) {
      return createResponse(NOT_FOUND_RESPONSE);
    }
    const hashedPassword: string = await hashPassword(userPassword, user.userName)
    if (hashedPassword === user.userPassword) {
      const secret: string = request.env.JWT_SECRET as string;
      const userToReturn: User = {
        ...user,
        jwt: await generateJWT({userName: user.userName}, secret)
      };
      delete (userToReturn as any).userPassword;

      return createResponse({body: userToReturn, code: OK_CODE});
    } else {
      return createResponse(NOT_FOUND_RESPONSE);
    }
  } catch (e) {
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
  }
}
