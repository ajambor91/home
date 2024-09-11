import {Inject, Injectable} from "@angular/core";
import {ISupportInterface} from "./support.interface";
import {FORMATTERS_TOKEN} from "./formatters.token";
import {IFormatInterface} from "./formatter.interfaces";


@Injectable({
  providedIn: 'root'
})
export class Processor implements ISupportInterface {
  constructor(@Inject(FORMATTERS_TOKEN) private formatters: IFormatInterface[]) {}

  public support(item: any): boolean {
    return this.formatters.some(formatter => formatter.support(item));
  }

  public process(item: any): any {
    const formatter = this.formatters.find(formatter => formatter.support(item));
    if (formatter) {
      return formatter.format(item);
    }
    return item;
  }
}
