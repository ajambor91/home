import {Routes} from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {PostsListComponent} from "./components/main/posts-list/posts-list.component";
import {CategoriesListComponent} from "./components/main/categories-list/categories-list.component";
import {NewPostComponent} from "./components/main/new-post/new-post.component";
import {EditPostComponent} from "./components/main/edit-post/edit-post.component";
import {AddCategoryComponent} from "./components/main/add-category/add-category.component";
import {EditCategoryComponent} from "./components/main/edit-category/edit-category.component";

export const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuard], children: [
      {path: 'add-post', component: NewPostComponent},
      {path: 'edit-post/:id', component: EditPostComponent},

      {path: 'posts-list', component: PostsListComponent},
      {path: 'add-category', component: AddCategoryComponent},
      {path: 'edit-category/:id', component: EditCategoryComponent},

      {path: 'categories-list', component: CategoriesListComponent},

    ]
  },
  {path: 'login', component: LoginComponent},
];
