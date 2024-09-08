import {Component, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Posts, User} from "api-types";
import {Observable} from "rxjs";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  @Input() public posts$!: Observable<Posts>;
}
