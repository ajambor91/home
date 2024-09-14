import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormGroupFrom} from "../core/generic.types";
import {CategoryForm, ParentCategoryForm} from 'shared-types'

export type CategoryEditForm = Partial<FormGroupFrom<CategoryForm>>
export type  ParentCategoryEditForm = Partial<FormGroupFrom<ParentCategoryForm>>;
export const categoryForm: () => FormGroup = () => {
  return new FormGroup<CategoryEditForm>({
    categoryName: new FormControl<string>('', [Validators.required]),
    categoryParent: new FormControl<number | null>(null)
  })
}
