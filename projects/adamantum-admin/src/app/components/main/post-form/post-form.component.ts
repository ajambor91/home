
import {PostForm } from "../../../forms/post-new.form";
import {EditPost, NewPost} from "shared-types";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {PostsService} from "../../../services/posts.service";
import {CategoriesService} from "../../../services/categories.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, FormsModule, ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
  providers: [PostsService, CategoriesService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PostFormComponent  {
  @Input() public  postForm!: FormGroup<PostForm>;
  @Input() public  categories$!: Observable<any>;
  @Output() public passPost: EventEmitter<NewPost | EditPost> = new EventEmitter<NewPost | EditPost>()
  constructor() {
  }

  public onSubmit(): void {
    console.log('xxx')
    this.passPost.emit(this.postForm.getRawValue() as NewPost | EditPost);
  }
}
