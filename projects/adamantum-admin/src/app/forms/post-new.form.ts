import {FormGroupFrom} from "../core/generic.types";
import {NewPost} from "shared-types";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export type PostNewForm = FormGroupFrom<NewPost>
export const postNewForm: () => FormGroup = () => {
  return new FormGroup<PostNewForm>({
    postContent: new FormControl<string>('', [Validators.required]),
    postTitle: new FormControl<string>('',[Validators.required]),
    categoryId: new FormControl<number>(0),
    fullPath: new FormControl<string>('')
  })
}
