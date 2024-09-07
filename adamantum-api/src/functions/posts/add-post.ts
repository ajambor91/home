import {Env} from "../../index";
import {createResponse} from "../../core/help_functions/functions";
import {HttpRequest} from "../../core/router/types";
import {NewPostPayload} from "./models";
import {INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE, OK_RESPONSE} from "../../core/router/default-responses";

export async function addPost(request: HttpRequest<NewPostPayload>): Promise<Response> {
    try {
        await request.env.adamantumDb.prepare("INSERT INTO posts (postTitle, postContent, fullPath, category) VALUES (?, ?, ?, ?)")
            .bind(request.body.postTitle, request.body.postContent, request.body.postTitle, 'bbb')
            .run();
        return createResponse(OK_RESPONSE);

    } catch (e) {
        return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
    }
    return createResponse(NOT_FOUND_RESPONSE)
}