import { Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];
