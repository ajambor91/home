
import {postForm, PostForm} from "../../../forms/post-new.form";
import {EditPost, NewPost} from "shared-types";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {PostsService} from "../../../services/posts.service";
import {CategoriesService} from "../../../services/categories.service";
import {Observable} from "rxjs";
import {PostFormComponent} from "../post-form/post-form.component";

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, FormsModule, ReactiveFormsModule, NgForOf, PostFormComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
  providers: [PostsService, CategoriesService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NewPostComponent {
  public readonly newPostForm: FormGroup<PostForm> = postForm();
  public readonly categories$: Observable<any> = this._categoriesService.getCategories$();
  constructor(private _postService: PostsService, private _categoriesService: CategoriesService) {
  }

  public onSubmit(data: NewPost | EditPost): void {
    const post: NewPost = data as NewPost;
    this._postService.addPost(post);
  }}
