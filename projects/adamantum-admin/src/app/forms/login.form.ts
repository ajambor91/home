import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormGroupFrom} from "../core/generic.types";
import {UserLogin} from 'shared-types'

export type IUserLoginForm = FormGroupFrom<UserLogin>
export const loginForm: () => FormGroup = () => {
  return new FormGroup<IUserLoginForm>({
    userLogin: new FormControl<string>('', [Validators.required]),
    userPassword: new FormControl<string>('',[Validators.required])
  })
}
