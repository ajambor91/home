import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoriesService} from "../../../services/categories.service";
import {CategoryEditForm, categoryForm} from "../../../forms/category.form";
import {Observable} from "rxjs";
import {EditCategory, NewCategory} from "shared-types";
import {CategoryFormComponent} from "../category-form/category-form.component";


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, FormsModule, ReactiveFormsModule, NgForOf, CategoryFormComponent],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
  providers: [CategoriesService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class EditCategoryComponent implements OnInit {
  public categoryForm: FormGroup<CategoryEditForm> = categoryForm();
  public categories$: Observable<any> = this._categoriesService.getCategories$();

  constructor(private _categoriesService: CategoriesService, private _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.setForm();
    console.log('dsfdsfgregrtegrgrg')
  }

  public onSubmit(category: EditCategory | NewCategory): void {
    const editedCategory: EditCategory = category;
    this._categoriesService.editCategory(editedCategory);
  }

  private setForm(): void {
    const idParam: any | null = this._route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }
    console.log(idParam)
    const categoryId: number = +idParam;
    this._categoriesService.getCategory(categoryId).subscribe(res => this.categoryForm.patchValue(res))
  }
}
