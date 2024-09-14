import {Inject} from "@angular/core";
import {ISupportInterface} from "./support.interface";
import {FORMATTERS_TOKEN} from "./formatters.token";
import {IFormatInterface} from "./formatter.interfaces";


export class Processor<T, U> implements ISupportInterface<T> {
  constructor(@Inject(FORMATTERS_TOKEN) private formatters: Array<IFormatInterface<T, U>>) {
  }

  public support(item: T): boolean {
    return this.formatters.some(formatter => formatter.support(item));
  }

  public process(item: T): U []| null{
    const formatter = this.formatters.find(formatter => formatter.support(item));
    if (formatter) {
      return formatter.format(item);
    }
    return null;
  }
}
