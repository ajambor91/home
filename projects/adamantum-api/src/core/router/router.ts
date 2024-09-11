import {
  BAD_REQUEST_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
  METHOD_NOT_ALLOWED_RESPONSE,
  NOT_FOUND_RESPONSE,
  UNAUTHORIZED_RESPONSE
} from "./default-responses";
import {Route, RouteRaw} from "./types";
import {Env} from "../../index";
import {routes} from "../../routes";
import {createResponse, createRouteBody} from "../help_functions/functions";
import {BaseBody} from "../middleware/jsonify";

export class Router {
  private params: { [key: string]: string } = {};
  private queries: { [key: string]: string } = {};
  private currentRoute!: Route<BaseBody> | undefined;

  constructor(private _route: RouteRaw, private _req: Request, private _env: Env) {
  }

  public async route(): Promise<Response> {
    try {
      const matchedRoutes: Route[] | undefined = routes.reduce((acc, curr) => {
        const regexpRoutePath = curr.pathname.replace(/:([^\s/]+)/g, (_, paramName) => {
          return '([\\w-]+)';
        });
        if (new RegExp(`^${regexpRoutePath}$`).test(this._route.pathname)) {
          acc.push(curr)
        }
        return acc
      }, [] as Route[])
      if (!matchedRoutes) {
        return createResponse(NOT_FOUND_RESPONSE)
      }
      const matchedRouteByMethod: Route | undefined = matchedRoutes.find(route => route.method === this._route.method)
      if (matchedRoutes && !matchedRouteByMethod) {
        return createResponse(METHOD_NOT_ALLOWED_RESPONSE);
      }

      this.currentRoute = matchedRouteByMethod;
      if (!this.currentRoute) return createResponse(NOT_FOUND_RESPONSE);
      this.parseQueries();
      this.parseParams();
      let body: BaseBody | null = null;

      if (this.currentRoute.middleware) {
        try {
          body = await this.currentRoute.middleware(this._req);
        } catch {
          return createResponse(BAD_REQUEST_RESPONSE);
        }
      }

      const headers = this._req.headers;
      const httpRequest = createRouteBody(body, this._env, headers, this.params, this.queries);

      if (this.currentRoute.guard && !(await this.currentRoute.guard(httpRequest))) {
        return createResponse(UNAUTHORIZED_RESPONSE);
      }

      return await this.currentRoute.function(httpRequest);

    } catch (e) {
      console.error("Error in router:", e);
      return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
    }
  }

  private parseQueries(): void {
    if (!this.currentRoute) {
      return;
    }
    let queries: { [key: string]: string } = {};
    this._route.queries?.forEach((value, key) => {
      queries[key] = value;
    })
    this.queries = queries;
  }


  private parseParams(): void {
    if (!this.currentRoute) {
      return;
    }
    const routeParts = this.currentRoute.pathname.split('/');
    const actualParts = new URL(this._req.url).pathname.split('/');

    routeParts.forEach((part, index) => {
      if (part.startsWith(':')) {
        const paramName = part.slice(1);
        this.params[paramName] = actualParts[index] as string;
      }
    });

  }
}
