import {createResponse, getRepository} from "../../core/help_functions/functions";
import { HttpRequest } from "../../core/router/types";
import { INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE, OK_RESPONSE } from "../../core/router/default-responses";
import {NewPost} from 'shared-types';
import {PostEntity} from "../../entities/post.entity";
import {PostRepository} from "../../repositories/post.repository";
import {mapCategoryDTOToEntity} from "../../data-transfer-objects/category.dto";
import {mapPostDTOToEntity} from "../../data-transfer-objects/post.dto";
export const addPost = async (request: HttpRequest<NewPost>): Promise<Response> => {
  try {
    const payload: NewPost = request.body;
    const newPost: PostEntity = mapPostDTOToEntity(payload);

    const repo: PostRepository = getRepository(PostRepository, request.env);
    await repo.addNew(newPost);
    return createResponse(OK_RESPONSE);
  } catch (e) {
    console.error(e)
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
  }
  return createResponse(NOT_FOUND_RESPONSE);
};
