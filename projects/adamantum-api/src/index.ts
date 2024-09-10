import {HttpMethod, RouteRaw} from "./core/router/types";
import {Router} from "./core/router/router";
import {PostRepository} from "./repositories/post.repository";
import {PostEntity} from "./entities/post.entity";
import {DependencyContainer} from "./core/classes/dependency-container.class";
import {CategoryRepository} from "./repositories/category.repository";
import {UserRepository} from "./repositories/user.repository";

import {UserEntity} from "./entities/user.entity";
import {CategoryEntity} from "./entities/category.entity";
const container = DependencyContainer.getInstance();

container.registerFactory('PostRepository', PostRepository);
container.registerFactory('PostEntity', PostEntity);
container.registerFactory('CategoryRepository', CategoryRepository);
container.registerFactory('CategoryEntity', CategoryEntity);
container.registerFactory('UserRepository', UserRepository);
container.registerFactory('UserEntity', UserEntity);


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
