
import {HttpMethod, RouteRaw, Routes} from "./core/router/types";
import {Router} from "./core/router/router";

export interface Env {
	'adamantumDb': D1Database; // Zdefiniowana baza danych
}




export default {
	async fetch(request: Request, env: Env): Promise<Response> {
				console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
				const route: RouteRaw = {
					method: request.method as HttpMethod,
					pathname: new URL(request.url).pathname
				}
				const router: Router = new Router(route, request, env);
				return router.route();



	}
};
