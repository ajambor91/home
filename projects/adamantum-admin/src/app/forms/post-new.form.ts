import {FormGroupFrom} from "../core/generic.types";
import {EditPost, NewPost} from "shared-types";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export type PostForm = FormGroupFrom<NewPost | EditPost>
export const postForm: () => FormGroup = () => {
  return new FormGroup<PostForm>({
    postId: new FormControl<number | null>(null),
    postContent: new FormControl<string | null>('', [Validators.required]),
    postTitle: new FormControl<string | null>('', [Validators.required]),
    categoryId: new FormControl<number | null>(0),
  })
}
