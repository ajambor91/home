import {BaseBody} from "../middleware/jsonify";
import {Env} from "../../index";


export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'TRACE' | 'CONNECT' | 'OPTIONS';

export interface Routes extends Array<Route<any>> {
}

export interface Route<T extends BaseBody | null | unknown = BaseBody> {
  pathname: string;
  method: HttpMethod;
  function: (request: HttpRequest<T>) => Promise<Response>;
  middleware?: <T extends BaseBody>(request: Request) => Promise<T>;
  guard?: (request: HttpRequest<T>) => Promise<boolean>;
}

export interface RouteRaw extends Omit<Route, 'function'> {
  queries?: URLSearchParams
}

export interface HttpRequest<T extends BaseBody | null | unknown = BaseBody> {
  env: Env;
  body?: T;
  params?: { [key: string]: string };
  queries?: { [key: string]: string };
  headers: Headers
}


export interface HttpResponse {
  body: { [key: string]: any };
  code: number;
}
