import { HttpResponse } from "./types";
import {
    OK, OK_CODE,
    CREATED, CREATED_CODE,
    ACCEPTED, ACCEPTED_CODE,
    NO_CONTENT, NO_CONTENT_CODE,
    BAD_REQUEST, BAD_REQUEST_CODE,
    UNAUTHORIZED, UNAUTHORIZED_CODE,
    FORBIDDEN, FORBIDDEN_CODE,
    NOT_FOUND, NOT_FOUND_CODE,
    METHOD_NOT_ALLOWED, METHOD_NOT_ALLOWED_CODE,
    CONFLICT, CONFLICT_CODE,
    UNPROCESSABLE_ENTITY, UNPROCESSABLE_ENTITY_CODE,
    INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR_CODE
} from "./http-statuses";

// 200 OK
export const OK_RESPONSE: HttpResponse = {
    body: {
        message: OK,
    },
    code: OK_CODE
};

// 201 Created
export const CREATED_RESPONSE: HttpResponse = {
    body: {
        message: CREATED,
    },
    code: CREATED_CODE
};

// 202 Accepted
export const ACCEPTED_RESPONSE: HttpResponse = {
    body: {
        message: ACCEPTED,
    },
    code: ACCEPTED_CODE
};

// 204 No Content
export const NO_CONTENT_RESPONSE: HttpResponse = {
    body: {
        message: NO_CONTENT,
    },
    code: NO_CONTENT_CODE
};

// 400 Bad Request
export const BAD_REQUEST_RESPONSE: HttpResponse = {
    body: {
        message: BAD_REQUEST,
    },
    code: BAD_REQUEST_CODE
};

// 401 Unauthorized
export const UNAUTHORIZED_RESPONSE: HttpResponse = {
    body: {
        message: UNAUTHORIZED,
    },
    code: UNAUTHORIZED_CODE
};

// 403 Forbidden
export const FORBIDDEN_RESPONSE: HttpResponse = {
    body: {
        message: FORBIDDEN,
    },
    code: FORBIDDEN_CODE
};

// 404 Not Found
export const NOT_FOUND_RESPONSE: HttpResponse = {
    body: {
        message: NOT_FOUND,
    },
    code: NOT_FOUND_CODE
};

// 405 Method Not Allowed
export const METHOD_NOT_ALLOWED_RESPONSE: HttpResponse = {
    body: {
        message: METHOD_NOT_ALLOWED,
    },
    code: METHOD_NOT_ALLOWED_CODE
};

// 409 Conflict
export const CONFLICT_RESPONSE: HttpResponse = {
    body: {
        message: CONFLICT,
    },
    code: CONFLICT_CODE
};

// 422 Unprocessable Entity
export const UNPROCESSABLE_ENTITY_RESPONSE: HttpResponse = {
    body: {
        message: UNPROCESSABLE_ENTITY,
    },
    code: UNPROCESSABLE_ENTITY_CODE
};

// 500 Internal Server Error
export const INTERNAL_SERVER_ERROR_RESPONSE: HttpResponse = {
    body: {
        message: INTERNAL_SERVER_ERROR,
    },
    code: INTERNAL_SERVER_ERROR_CODE
};
