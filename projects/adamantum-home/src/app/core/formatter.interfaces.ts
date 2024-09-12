import {ISupportInterface} from "./support.interface";


export interface IFormatInterface<T, U> extends ISupportInterface<T> {
  format(item: T): U;
}
