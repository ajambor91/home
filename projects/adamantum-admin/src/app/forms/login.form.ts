import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormGroupFrom} from "../core/generic.types";
import {UserLogin} from 'shared-types'

export type UserLoginForm = Partial<FormGroupFrom<UserLogin>>
export const loginForm: () => FormGroup = () => {
  return new FormGroup<UserLoginForm>({
    userLogin: new FormControl<string>('', [Validators.required]),
    userPassword: new FormControl<string>('', [Validators.required])
  })
}
