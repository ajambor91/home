import {HttpRequest, HttpResponse} from "../router/types";
import {Env} from "../../index";
import {BaseBody} from "../middleware/jsonify";

export const createResponse: (httpResponse: HttpResponse) => Response = (httpResponse: HttpResponse): Response => {
    return new Response(JSON.stringify(httpResponse.body), {
        headers: { "Content-Type": "application/json" },
        status: httpResponse.code
    })
}

export const createRouteBody: (body: any, env: Env) => HttpRequest<BaseBody> = (body: any,  env: Env) => {
    return {
        body: body,
        env: env
    }
}