import {EntityClass} from "./entity.abstract";

export abstract class RepoClass {
  public abstract getAll(): Promise<EntityClass[]>;

  public abstract getById(id: number): Promise<EntityClass>;

  public abstract updateById(entity: EntityClass): Promise<void>;

  public abstract softDeleteById(id: number): Promise<void>;

  public abstract addNew(entity: EntityClass): Promise<void>;

  protected mapTimestampToDate(date: number): Date {
    return new Date();
  }
}
