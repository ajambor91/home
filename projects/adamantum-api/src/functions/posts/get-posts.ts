import {createResponse, getRepository} from "../../core/help_functions/functions";
import { HttpRequest } from "../../core/router/types";
import { INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE } from "../../core/router/default-responses";
import { OK_CODE } from "../../core/router/http-statuses";
import { Posts } from "shared-types";
import {PostRepository} from "../../repositories/post.repository";
import {PostEntity} from "../../entities/post.entity";


export const getPosts = async (request: HttpRequest<Posts>): Promise<Response> => {
  try {
    const postRepository: PostRepository = getRepository(PostRepository, request.env);
    const result: PostEntity[] = await postRepository.getAll();
    return createResponse({ body: result, code: OK_CODE });
  } catch (e) {
    console.error(e)
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
  }
  return createResponse(NOT_FOUND_RESPONSE);
};
