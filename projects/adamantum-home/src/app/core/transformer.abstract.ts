import {ISupportInterface} from "./support.interface";
import {Processor} from "./processor";


export abstract class TransformerAbstract<T, U> implements ISupportInterface<any> {

  constructor(protected processor: Processor<T, U>) {
  }

  public support(item: any): boolean {
    console.log('in suppoert', this.processor)
    // return false;
    return this.processor.support(item);
  }

  public transform(input: T): T | U | null {
    if (this.support(input)) {
      return this.processor.process(input);
    }
    return null;
  }
}
