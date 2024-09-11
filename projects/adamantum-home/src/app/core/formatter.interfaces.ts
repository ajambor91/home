import {ISupportInterface} from "./support.interface";


export interface IFormatInterface<T, U> extends ISupportInterface{
  format(item: T): U;
}
