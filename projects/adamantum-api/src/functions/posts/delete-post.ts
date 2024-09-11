import {createResponse, getRepository} from "../../core/help_functions/functions";
import {HttpRequest} from "../../core/router/types";
import {
  BAD_REQUEST_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
  NOT_FOUND_RESPONSE,
  OK_RESPONSE
} from "../../core/router/default-responses";
import {PostRepository} from "../../repositories/post.repository";

export const deletePost = async (request: HttpRequest<void>): Promise<Response> => {
  try {
    const postId: number | null =  request.params?.id ? +request.params.id : null;
    if (!postId) {
      return createResponse(BAD_REQUEST_RESPONSE)
    }
    const repo: PostRepository = getRepository(PostRepository, request.env);
    await repo.softDeleteById(postId);
    return createResponse(OK_RESPONSE);
  } catch (e) {
    console.error(e)
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
  }
  return createResponse(NOT_FOUND_RESPONSE);
};

