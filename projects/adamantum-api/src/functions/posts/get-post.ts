import {createResponse, getQueryParam, getRepository} from "../../core/help_functions/functions";
import {HttpRequest} from "../../core/router/types";
import {
  BAD_REQUEST_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
  NOT_FOUND_RESPONSE
} from "../../core/router/default-responses";
import {OK_CODE} from "../../core/router/http-statuses";
import {PostRepository} from "../../repositories/post.repository";
import {PostEntity} from "../../entities/post.entity";


export const getPost = async (request: HttpRequest<void>): Promise<Response> => {
  try {
    const postRepository: PostRepository = getRepository(PostRepository, request.env);
    const postId: number = getQueryParam(request.params, 'id') as number;
    console.log(request.queries)
    if (!postId) {
      return createResponse(BAD_REQUEST_RESPONSE)
    }
    const result: PostEntity = await postRepository.getById(postId);
    return createResponse({body: result, code: OK_CODE});
  } catch (e) {
    console.error(e)
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
  }
  return createResponse(NOT_FOUND_RESPONSE);
};
