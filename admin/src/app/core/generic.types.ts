import {FormControl} from "@angular/forms";

export type FormGroupFrom<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
}
