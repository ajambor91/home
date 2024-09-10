import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Post, Posts} from "shared-types";
import {Observable} from "rxjs";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {PostFormComponent} from "../post-form/post-form.component";
import {PostsService} from "../../../services/posts.service";
import {TableComponent} from "../../generic/table/table.component";
import {Action, ActionTypes, postsTable, TableConfig} from "../../../core/table.config";
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

  constructor(private _categoriesService: CategoriesService, private _router: Router) {
  }

}
