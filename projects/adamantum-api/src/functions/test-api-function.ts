import {HttpRequest} from "../core/router/types";
import {RestApiClient} from "../services/rest-api.client";
import {createResponse, getService} from "../core/help_functions/functions";
import {OK_CODE} from "../core/router/http-statuses";
import {INTERNAL_SERVER_ERROR_RESPONSE} from "../core/router/default-responses";

export const testApiFunction = async (request: HttpRequest<any>): Promise<Response> => {
  const apiClient: RestApiClient = getService(RestApiClient)
  try {
    const data: any = apiClient.translateCategory('Programowanie');
    console.log(data)
    return createResponse({body: data, code: OK_CODE})
  } catch (e: any) {
    console.error(e);
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE)

  }
}
