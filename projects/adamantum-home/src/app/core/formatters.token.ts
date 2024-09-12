import {InjectionToken} from "@angular/core";
import {IFormatInterface} from "./formatter.interfaces";


export const FORMATTERS_TOKEN = new InjectionToken<IFormatInterface<unknown, unknown>[]>('FORMATTERS');
