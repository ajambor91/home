import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormGroupFrom} from "../core/generic.types";
import { CategoryForm} from 'shared-types'

export type CategoryEditForm = FormGroupFrom<CategoryForm>
export const categoryForm: () => FormGroup = () => {
  return new FormGroup<CategoryEditForm>({
    categoryName: new FormControl<string>('', [Validators.required]),
    categoryParent: new FormControl<number>(0)
  })
}
