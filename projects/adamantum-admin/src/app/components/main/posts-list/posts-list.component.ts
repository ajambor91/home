import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Post} from "shared-types";
import {Observable} from "rxjs";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {PostFormComponent} from "../post-form/post-form.component";
import {PostsService} from "../../../services/posts.service";
import {TableComponent} from "../../generic/table/table.component";
import {Action, ActionTypes, postsTable, TableConfig} from "../../../core/table.config";

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, PostFormComponent, NgForOf, TableComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PostsListComponent {
  public posts$: Observable<Post[]> = this._postsService.getPosts$() as Observable<Array<any>>;
  public page: number = 0;
  public currentPage: number = 0;
  public totalPages: number = 0;
  public pages: number[] = [1, 2, 3]
  public tableConfig: TableConfig = postsTable;

  constructor(private _postsService: PostsService, private _router: Router) {
  }

  public runAction(action: Action): void {
    switch (action.action) {
      case ActionTypes.EditPost:
        this.editPost(action.params);
        break
      case ActionTypes.DeletePost:
        this.deletePost(action.params)
        break
    }
  }

  private editPost(post: Post): void {
    this._router.navigate(['/edit-post', post.postId])
  }

  private deletePost(post: Post): void {
    this._postsService.deletePost(post.postId as number)
    this.posts$ = this._postsService.getPosts$();
  }


}
