import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Category, EditCategory, NewCategory, Post} from "shared-types";
import {ApiService} from "./api.service";


@Injectable()
export class CategoriesService {
  constructor(private _api: ApiService) {
  }

  public getCategories$(): Observable<Post[]> {
    return this._api.getCategories$();
  }

  public addCategory(category: NewCategory): void {
    this._api.addCategory$(category).subscribe()
  }

  public deleteCategory(id: number): void {
    this._api.deleteCategory$(id).subscribe();
  }

  public editCategory(category: EditCategory): void {
    this._api.editCategory$(category).subscribe()
  }

  public getCategory(categoryId: number): Observable<Category> {
    return this._api.getCategory$(categoryId);
  }
}
