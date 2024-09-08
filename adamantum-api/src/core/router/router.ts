import { Route, RouteRaw } from "./types";
import {createResponse, createRouteBody} from "../help_functions/functions";
import { Env } from "../../index";
import { routes } from "../../routes";
import {BaseBody} from "../middleware/jsonify";
import {BAD_REQUEST_RESPONSE, INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE} from "./default-responses";

export class Router {

    constructor(private _route: RouteRaw, private _req: Request, private _env: Env) {}

    public async route(): Promise<Response> {
        try {
            const currentRoute: Route | undefined = routes.find(item => item.pathname.startsWith(this._route.pathname.replace(/\/$/, '')) && item.method === this._route.method);
            let body: BaseBody | null = null;
            if (currentRoute !== undefined) {
                if (currentRoute.middleware) {
                    console.log('$$$$$$$$$$$$$$$')
                    console.log(this._req.body)
                    try {
                        body = await currentRoute.middleware(this._req);


                    } catch (middlewareError) {
                        console.log(middlewareError)
                        return createResponse(BAD_REQUEST_RESPONSE);
                    }
                }

                return await currentRoute.function(createRouteBody(body, this._env));
            }

            return createResponse(NOT_FOUND_RESPONSE);

        } catch (e) {
            console.error("Error in router:", e);
            return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
        }
    }
}
