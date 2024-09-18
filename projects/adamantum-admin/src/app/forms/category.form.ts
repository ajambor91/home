import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormGroupFrom} from "../core/generic.types";
import { EditCategory} from 'shared-types'

export type CategoryEditForm = Partial<FormGroupFrom<EditCategory>>
export const categoryForm: () => FormGroup = () => {
  return new FormGroup<CategoryEditForm>({
    categoryName: new FormControl<string>('', [Validators.required]),
    parentCategoryId: new FormControl<number | null>(null)
  })
}
