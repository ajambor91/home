import { HttpRequest } from "../../core/router/types";
import { UserBase, UserLogin} from "api-types";
import {createResponse, hashPassword} from "../../core/help_functions/functions";
import {INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE, OK_RESPONSE} from "../../core/router/default-responses";

export async function loginUser(request: HttpRequest<UserLogin>): Promise<Response> {
    try {
        const { userLogin, userPassword }: UserLogin = request.body;

        const user: UserBase = await request.env.adamantumDb.prepare('SELECT * FROM users WHERE userLogin = ?').bind(userLogin).first() as UserBase;
        if (!user) {
            return createResponse(NOT_FOUND_RESPONSE);
        }
        const hashedPassword: string = await hashPassword(userPassword, user.userName)
        console.log(hashedPassword)

        if (hashedPassword === user.userPassword) {
            return createResponse(OK_RESPONSE);
        } else {
            return createResponse(NOT_FOUND_RESPONSE);
        }
    } catch (e) {
        console.log(e)
        return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
    }
}
