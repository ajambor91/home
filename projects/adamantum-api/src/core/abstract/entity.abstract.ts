import {BaseBody} from "../middleware/jsonify";

export abstract class EntityClass {
  [key: string]: any;
  constructor(data: BaseBody | EntityClass) {
    this.map<EntityClass>(data);
    this.setCreatedAt();
  }
  protected setCreatedAt(): void {
    if (!this['createdAt']) {
      this['createdAt'] = new Date();
    }
  }
  protected map<T>(data: Partial<T>): void {
    Object.assign(this, data);
  }

}
