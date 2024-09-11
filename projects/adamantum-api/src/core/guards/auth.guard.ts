import {HttpRequest} from "../router/types";
import {verifyJWT} from "../help_functions/functions";

export const authGuard: (req: HttpRequest<any>) => Promise<boolean> = async (req: HttpRequest) => {
  const token: string | undefined = req.headers.get('Authorization')?.replace(/^Bearer/, '').trim();
  if (!token) {
    return false;
  }
  const sercret: string = req.env.JWT_SECRET;
  return await verifyJWT(token, sercret);
}
