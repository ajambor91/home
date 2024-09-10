
import {PostNewForm, postNewForm} from "../../../forms/post-new.form";
import {CategoryForm, NewPost} from "shared-types";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {PostsService} from "../../../services/posts.service";
import {CategoryEditForm, categoryForm} from "../../../forms/category.form";
import {CategoriesService} from "../../../services/categories.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, FormsModule, ReactiveFormsModule, NgForOf],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
  providers: [CategoriesService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CategoryFormComponent {
  public readonly categoryForm: FormGroup<CategoryEditForm> = categoryForm();
  public readonly categories$: Observable<any> = this._categoriesService.getCategories$();
  constructor(private _categoriesService: CategoriesService) {
  }

  public onSubmit(): void {
    const newCategory: CategoryForm = this.categoryForm.getRawValue() as CategoryForm;
    console.log(newCategory)
    this._categoriesService.addCategory(newCategory);
  }}
