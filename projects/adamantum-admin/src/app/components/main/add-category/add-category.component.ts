import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoriesService} from "../../../services/categories.service";
import {CategoryEditForm, categoryForm} from "../../../forms/category.form";
import {Observable} from "rxjs";
import {CategoryForm, NewCategory} from "shared-types";
import {CategoryFormComponent} from "../category-form/category-form.component";


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, FormsModule, ReactiveFormsModule, NgForOf, CategoryFormComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
  providers: [CategoriesService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AddCategoryComponent {
  public readonly categoryForm: FormGroup<CategoryEditForm> = categoryForm();
  public readonly categories$: Observable<any> = this._categoriesService.getCategories$();

  constructor(private _categoriesService: CategoriesService) {
  }

  public onSubmit(newCategory: NewCategory): void {
    this._categoriesService.addCategory(newCategory);
  }
}
