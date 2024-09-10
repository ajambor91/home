import { PostTypes } from "shared-types";
import { PostEntity } from "../entities/post.entity";
import { PostDB} from 'shared-types';
export interface PostDTO extends Partial<PostDB> {}
export const mapPostDTOToEntity = (dto: PostTypes): PostEntity => {
  const postId: number | null = 'postId' in dto  && typeof dto.postId !== 'undefined' ? dto.postId : null;
  const createdAt: Date = 'createdAt' in dto && typeof dto.createdAt === 'number' ? new Date(dto.createdAt) : new Date();
  const deletedAt: Date | null = 'deletedAt' in dto ? (dto.deletedAt ? new Date(dto.deletedAt) : null) : null;
  const categoryId: number | null = !!dto.categoryId ? dto.categoryId : null;
  return new PostEntity({
    postId: postId,
    postTitle: dto.postTitle,
    postContent: dto.postContent,
    fullPath: dto.fullPath,
    categoryId: categoryId,
    createdAt: createdAt,
    deletedAt: deletedAt,
  });
};
