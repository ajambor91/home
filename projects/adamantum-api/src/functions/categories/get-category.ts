import {createResponse, getQueryParam, getRepository} from "../../core/help_functions/functions";
import {HttpRequest} from "../../core/router/types";
import {INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE} from "../../core/router/default-responses";
import {OK_CODE} from "../../core/router/http-statuses";
import {CategoryRepository} from "../../repositories/category.repository";
import {CategoryEntity} from "../../entities/category.entity";


export const getCategory = async (request: HttpRequest<void>): Promise<Response> => {
  try {
    const categoryRepo: CategoryRepository = getRepository(CategoryRepository, request.env);
    const id: number = getQueryParam(request.params, 'id') as number;
    const result: CategoryEntity = await categoryRepo.getById(id);
    return createResponse({body: result, code: OK_CODE});
  } catch (e) {
    console.error(e)
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
  }
  return createResponse(NOT_FOUND_RESPONSE);
};
