import {ISupportInterface} from "./support.interface";
import {Processor} from "./processor";


export abstract class TransformerAbstract<T, U> implements ISupportInterface<any> {
  constructor(private processor: Processor) {}

  public support(item: any): boolean {
    return this.processor.support(item);
  }

  public transform(input: T): U[] {
    if (this.support(input)) {
      return this.processor.process(input);
    }
    return [] as U[];
  }
}
