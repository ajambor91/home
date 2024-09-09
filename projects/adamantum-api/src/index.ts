import {HttpMethod, RouteRaw} from "./core/router/types";
import {Router} from "./core/router/router";

export interface Env {
	'adamantumDb': D1Database;
	JWT_SECRET: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				},
			});
		}

		const route: RouteRaw = {
			method: request.method as HttpMethod,
			pathname: new URL(request.url).pathname
		};
		const router: Router = new Router(route, request, env);
		const response = await router.route();

		response.headers.set('Access-Control-Allow-Origin', '*');
		response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

		return response;
	}
};
