import {ISupportInterface} from "./support.interface";
import {Processor} from "./processor";


export abstract class TransformerAbstract<T, U> implements ISupportInterface<any> {

  constructor(protected processor: Processor<T, U>) {
  }

  public support(item: any): boolean {

    return this.processor.support(item);
  }

  public transform(input: T): U[] | null {
    if (this.support(input)) {
      return this.processor.process(input);
    }
    return null;
  }
}
