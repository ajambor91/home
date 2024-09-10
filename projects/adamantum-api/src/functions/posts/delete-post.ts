import {createResponse, getRepository} from "../../core/help_functions/functions";
import { HttpRequest } from "../../core/router/types";
import { NewPostPayload } from "./models";
import { INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE, OK_RESPONSE } from "../../core/router/default-responses";
import {PostRepository} from "../../repositories/post.repository";

export const deletePost = async (request: HttpRequest<number>): Promise<Response> => {
  try {
    const repo: PostRepository = getRepository(PostRepository, request.env);
    await repo.softDeleteById(request.body);
    return createResponse(OK_RESPONSE);
  } catch (e) {
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
  }
  return createResponse(NOT_FOUND_RESPONSE);
};

