import {BaseBody} from "../middleware/jsonify";

export abstract class EntityClass {
  [key: string]: any;
  constructor() {
    this.setCreatedAt();
  }
  protected setCreatedAt(): void {
    if (!this['createdAt']) {
      this['createdAt'] = new Date();
    }
  }
}
