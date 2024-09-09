import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Posts} from "shared-types";
import {Observable} from "rxjs";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {PostsAddComponent} from "../post-add/posts-add.component";
import {PostsService} from "../../../services/posts.service";

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, PostsAddComponent, NgForOf],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PostsListComponent {
   public posts$: Observable<Posts> = this._postsService.getPosts$();
   public page: number = 0;
   public currentPage: number = 0;
   public totalPages: number = 0;
   public pages: number[] = [1,2,3]
  constructor(private _postsService: PostsService) {
  }

  public editPost(post: Posts): void {
    throw new Error('Not implemented');
  }

  public deletePost(postId: number): void {
    throw new Error('Not implemented');
  }

  public goToPage(page: number): void {
    throw new Error('Not implemented');
  }

  public previousPage(): void {
    throw new Error('Not implemented');
  }

  public nextPage(): void {
    throw new Error('Not implemented');
  }

}
