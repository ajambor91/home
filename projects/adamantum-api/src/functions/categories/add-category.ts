import {createResponse, getEntity, getRepository} from "../../core/help_functions/functions";
import {HttpRequest} from "../../core/router/types";
import {INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE, OK_RESPONSE} from "../../core/router/default-responses";
import {CategoryEntity} from "../../entities/category.entity";
import {CategoryRepository} from "../../repositories/category.repository";
import {NewCategory} from 'shared-types'

export const addCategory = async (request: HttpRequest<NewCategory>): Promise<Response> => {
  try {
    const payload: NewCategory = request.body as NewCategory;
    const newCategory: CategoryEntity = getEntity(CategoryEntity, payload)
    const repo: CategoryRepository = getRepository(CategoryRepository, request.env);
    await repo.addNew(newCategory);
    return createResponse(OK_RESPONSE);
  } catch (e) {
    console.error(e)
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
  }
  return createResponse(NOT_FOUND_RESPONSE);
};
