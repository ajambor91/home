import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Category, EditCategory, Posts} from "shared-types";
import {Observable} from "rxjs";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {PostFormComponent} from "../post-form/post-form.component";
import {TableComponent} from "../../generic/table/table.component";
import {Action, ActionTypes, categoryTable, TableConfig} from "../../../core/table.config";
import {CategoriesService} from "../../../services/categories.service";

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, PostFormComponent, NgForOf, TableComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CategoriesService]

})
export class CategoriesListComponent {
  public categories$: Observable<Posts> = this._categoriesService.getCategories$() as Observable<Array<any>>;
  public tableConfig: TableConfig = categoryTable;

  constructor(private _categoriesService: CategoriesService, private _router: Router) {
  }

  public runAction(action: Action): void {
    switch (action.action) {
      case ActionTypes.EditCategory:
        this.editCategory(action.params);
        break
      case ActionTypes.DeleteCategory:
        this.deleteCategory(action.params)
        break
    }
  }

  private editCategory(Category: Category): void {
    this._router.navigate(['/edit-category', Category.categoryId])
  }

  private deleteCategory(category: EditCategory): void {
    this._categoriesService.deleteCategory(category.categoryId as number)
    this.categories$ = this._categoriesService.getCategories$();
  }
}
