import { Component } from '@angular/core';
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import { IUserLoginForm, loginForm} from "../../forms/login.form";
import {AuthService} from "../../services/auth.service";
import {UserLogin} from "api-types";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [NgbTypeahead, ReactiveFormsModule]
})
export class LoginComponent {
  public readonly loginForm: FormGroup<IUserLoginForm> = loginForm();

  constructor(private authService: AuthService) {
  }

  public onSubmit(): void {
    const userLogin: UserLogin = this.loginForm.getRawValue() as UserLogin;
    this.authService.login(userLogin);
  }
}
