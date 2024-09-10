
import {PostNewForm, postNewForm} from "../../../forms/post-new.form";
import {NewPost} from "shared-types";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {PostsService} from "../../../services/posts.service";

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
  providers: [PostsService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PostFormComponent {
  public readonly loginForm: FormGroup<PostNewForm> = postNewForm();

  constructor(private _postService: PostsService) {
  }

  public onSubmit(): void {
    const newPost: NewPost = this.loginForm.getRawValue() as NewPost;
    const newPostTMP: NewPost = {
      postTitle: 'Text',
      postContent: 'xxx',
      fullPath: 'test',
      categoryId: 2
    }
    this._postService.addPost(newPostTMP);
  }}
