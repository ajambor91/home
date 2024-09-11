
import {postForm, PostForm} from "../../../forms/post-new.form";
import {EditPost, NewPost} from "shared-types";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {PostsService} from "../../../services/posts.service";
import {CategoriesService} from "../../../services/categories.service";
import {Observable} from "rxjs";
import {PostFormComponent} from "../post-form/post-form.component";

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, FormsModule, ReactiveFormsModule, NgForOf, PostFormComponent],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
  providers: [PostsService, CategoriesService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class EditPostComponent implements OnInit {
  public readonly editPostForm: FormGroup<PostForm> = postForm();
  public readonly categories$: Observable<any> = this._categoriesService.getCategories$();
  constructor(private _postService: PostsService, private _categoriesService: CategoriesService, private _activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.getPostAndSetForm();
  }

  private getPostAndSetForm(): void {
    const idParam: any = this._activatedRoute.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }
    const postId: number = +idParam;
    this._postService.getPost(postId, this.editPostForm);
  }
  public onSubmit(data: NewPost | EditPost): void {
    const post: EditPost = data as EditPost;
    this._postService.editPost(post);
  }}
