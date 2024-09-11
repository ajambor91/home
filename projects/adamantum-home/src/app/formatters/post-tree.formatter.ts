import {Injectable} from "@angular/core";
import {ISupportInterface} from "../core/support.interface";
import {IFormatInterface} from "../core/formatter.interfaces";


@Injectable({
  providedIn: 'root'
})
export class TransactionFormatter implements ISupportInterface, IFormatInterface<string, string> {
  format(item: string): string {
    return 'ss';
  }

  support(item: any): boolean {
    return false;
  }

}
