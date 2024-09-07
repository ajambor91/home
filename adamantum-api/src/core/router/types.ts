import {BaseBody} from "../middleware/jsonify";
import {Env} from "../../index";

export type HttpMethod = 'POST' | 'GET'
export interface Routes extends Array<Route<any>> {}
export interface Route<T extends BaseBody | null | unknown= BaseBody> {
    pathname: string;
    method: HttpMethod;
    function: (request: HttpRequest<T>) => Promise<Response>;
    middleware?: <T extends BaseBody>(request: Request) => Promise<T>
}

export interface RouteRaw extends Omit<Route, 'function'> {}

export interface HttpRequest<T extends BaseBody | null | unknown= BaseBody> {
    env: Env;
    body: T;
}



export interface HttpResponse {
    body: {[key: string]: any};
    code: number;
}
