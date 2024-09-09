import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Posts, User} from "shared-types";
import {Observable} from "rxjs";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {PostsAddComponent} from "../post-add/posts-add.component";

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, PostsAddComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PostsListComponent {
  @Input() public posts$!: Observable<Posts>;
}
