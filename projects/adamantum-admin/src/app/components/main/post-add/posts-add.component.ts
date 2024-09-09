
import {PostNewForm, postNewForm} from "../../../forms/post-new.form";
import {NewPost} from "shared-types";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {PostsService} from "../../../services/posts.service";

@Component({
  selector: 'app-posts-add',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './posts-add.component.html',
  styleUrl: './posts-add.component.scss',
  providers: [PostsService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PostsAddComponent {
  public readonly loginForm: FormGroup<PostNewForm> = postNewForm();

  constructor(private _postService: PostsService) {
  }

  public onSubmit(): void {
    const newPost: NewPost = this.loginForm.getRawValue() as NewPost;
    const newPostTMP: NewPost = {
      postTitle: 'Text',
      postContent: 'xxx',
      fullPath: 'test',
      category: 'category'
    }
    this._postService.addPost(newPostTMP);
  }}
