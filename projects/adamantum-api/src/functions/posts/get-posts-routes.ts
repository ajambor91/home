import {createResponse} from "../../core/help_functions/functions";
import {HttpRequest} from "../../core/router/types";
import {INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE} from "../../core/router/default-responses";
import {OK_CODE} from "../../core/router/http-statuses";
import { PostsRoutes} from "shared-types";

export async function getPostsRoutes(request: HttpRequest<PostsRoutes>): Promise<Response> {
    try {
        const {results}: any = await request.env.adamantumDb.prepare('SELECT fullPath, category FROM posts').all();
        return createResponse({body: results, code: OK_CODE})

    } catch (e) {
        return createResponse(INTERNAL_SERVER_ERROR_RESPONSE)

    }
    return createResponse(NOT_FOUND_RESPONSE)
}
