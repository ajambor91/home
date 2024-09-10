import { Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {PostFormComponent} from "./components/main/post-form/post-form.component";
import {PostsListComponent} from "./components/main/posts-list/posts-list.component";
import {CategoryFormComponent} from "./components/main/category-form/category-form.component";
import {CategoriesListComponent} from "./components/main/categories-list/categories-list.component";

export const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [AuthGuard], children: [
    {path: 'add-post', component: PostFormComponent},
      {path: 'edit-post/:id', component: PostFormComponent},

      {path: 'posts-list', component: PostsListComponent},
      {path: 'add-category', component: CategoryFormComponent},
      {path: 'categories-list', component: CategoriesListComponent},

    ]},
  {path: 'login', component: LoginComponent},
];
