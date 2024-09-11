import {inject, Injectable} from "@angular/core";
import {EnvironmentsService} from "./environments.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category, CategoryForm, EditCategory, EditPost, NewPost, Post, UserLogin} from "shared-types";


@Injectable({providedIn: 'root'})
export class ApiService {
  private readonly _apiUrl: string = inject(EnvironmentsService).apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  public login$(user: UserLogin): Observable<any> {
    return this.httpClient.post(`${this._apiUrl}users/login`, user);
  }

  public addPost$(post: NewPost): Observable<void> {
    return this.httpClient.post<void>(`${this._apiUrl}posts`, post)
  }

  public getPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this._apiUrl}posts/${id}`)
  }

  public editPost$(post: EditPost): Observable<void> {
    return this.httpClient.patch<void>(`${this._apiUrl}posts/${post.postId}`, post)
  }

  public deletePost$(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this._apiUrl}posts/${id}`)
  }

  public addCategory$(category: CategoryForm): Observable<void> {
    return this.httpClient.post<void>(`${this._apiUrl}categories`, category)

  }

  public getCategories$(): Observable<any> {
    return this.httpClient.get(`${this._apiUrl}categories`)
  }

  public deleteCategory$(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this._apiUrl}categories/${id}`);

  }

  public editCategory$(category: EditCategory): Observable<void> {
    return this.httpClient.patch<void>(`${this._apiUrl}categories/${category.categoryId}`, category);
  }

  public getCategory$(categoryId: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this._apiUrl}categories/${categoryId}`);
  }
}
