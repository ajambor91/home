import {createResponse, getRepository} from "../../core/help_functions/functions";
import {HttpRequest} from "../../core/router/types";
import {
  BAD_REQUEST_RESPONSE,
  INTERNAL_SERVER_ERROR_RESPONSE,
  NOT_FOUND_RESPONSE,
  OK_RESPONSE
} from "../../core/router/default-responses";
import {EditPost} from 'shared-types';
import {PostEntity} from "../../entities/post.entity";
import {PostRepository} from "../../repositories/post.repository";

export const editPost = async (request: HttpRequest<EditPost>): Promise<Response> => {
  try {
    const repo: PostRepository = getRepository(PostRepository, request.env);
    const payload: EditPost = request.body as EditPost;
    const postId: number | undefined = !!request.params?.id ? +request.params?.id : undefined;

    if (!postId) {
      return createResponse(BAD_REQUEST_RESPONSE)
    }
    const editedPost: PostEntity = await repo.getById(postId)
    if ('postContent' in payload && payload.postContent) {
      editedPost.setPostContent(payload.postContent);
    }
    if ('categoryId' in payload && payload.categoryId) {
      editedPost.setCategoryId(payload.categoryId);
    }
    if ('postTitle' in payload && payload.postTitle) {
      editedPost.setPostTitle(payload.postTitle);
    }
    if ('fullPath' in payload && payload.fullPath) {
      editedPost.setFullPath(payload.fullPath);
    }
    await repo.updateById(editedPost)
    return createResponse(OK_RESPONSE);
  } catch (e) {
    console.error(e)
    return createResponse(INTERNAL_SERVER_ERROR_RESPONSE);
  }
  return createResponse(NOT_FOUND_RESPONSE);
};
