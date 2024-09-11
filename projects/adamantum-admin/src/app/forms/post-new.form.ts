import {FormGroupFrom} from "../core/generic.types";
import {EditPost, NewPost} from "shared-types";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export type PostForm = FormGroupFrom<NewPost | EditPost>
export const postForm: () => FormGroup = () => {
  return new FormGroup<PostForm>({
    postId: new FormControl<number>(0),
    postContent: new FormControl<string>('', [Validators.required]),
    postTitle: new FormControl<string>('',[Validators.required]),
    categoryId: new FormControl<number>(0),
    fullPath: new FormControl<string>('')
  })
}
