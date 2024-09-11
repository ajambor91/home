import {createResponse, getQueryParam, getRepository} from "../../core/help_functions/functions";
import {HttpRequest} from "../../core/router/types";
import {INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE, OK_RESPONSE} from "../../core/router/default-responses";
import {CategoryRepository} from "../../repositories/category.repository";

export const deleteCategory = async (request: HttpRequest<void>): Promise<Response> => {
  try {

    const repo: CategoryRepository = getRepository(CategoryRepository, request.env);
    const categoryId: number = getQueryParam(request.queries, 'id') as  number;
    await repo.softDeleteById(categoryId);
    return createResponse(OK_RESPONSE);
  } catch (e) {
    console.error(e)
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
  }
  return createResponse(NOT_FOUND_RESPONSE);
};
