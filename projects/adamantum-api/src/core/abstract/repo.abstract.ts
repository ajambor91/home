import {EntityClass} from "./entity.abstract";
import {PostEntity} from "../../entities/post.entity";

export abstract class RepoClass {
  public abstract getAll(): Promise<EntityClass[]>;
  public abstract getById(id: number): Promise<EntityClass>;
  public abstract updateById(entity: PostEntity): Promise<void>;
  public abstract softDeleteById(id: number): Promise<void>;
  public abstract addNew(entity: EntityClass): Promise<void>;
}
