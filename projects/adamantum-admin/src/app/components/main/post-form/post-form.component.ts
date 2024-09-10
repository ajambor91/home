
import {PostNewForm, postNewForm} from "../../../forms/post-new.form";
import {NewPost} from "shared-types";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {PostsService} from "../../../services/posts.service";
import {CategoriesService} from "../../../services/categories.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, FormsModule, ReactiveFormsModule, NgForOf],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
  providers: [PostsService, CategoriesService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PostFormComponent {
  public readonly loginForm: FormGroup<PostNewForm> = postNewForm();
  public readonly categories$: Observable<any> = this._categoriesService.getCategories$();
  constructor(private _postService: PostsService, private _categoriesService: CategoriesService) {
  }

  public onSubmit(): void {
    const newPost: NewPost = this.loginForm.getRawValue() as NewPost;
    const newPostTMP: NewPost = {
      postTitle: newPost.postTitle,
      postContent: newPost.postContent,
      fullPath: 'test',
      categoryId: newPost.categoryId
    }
    this._postService.addPost(newPostTMP);
  }}
