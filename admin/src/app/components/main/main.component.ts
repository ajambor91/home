import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {Posts, User} from "api-types";
import {Observable} from "rxjs";
import {PostsListComponent} from "./posts-list/posts-list.component";
import {PostsApi} from 'api-lib/src/posts/posts.api';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, PostsListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  public get posts$(): Observable<Posts> {
    return this._postsService.getPost();
  }
  public get user$(): Observable<User> {
    return this._authService.getCurrentUser() as Observable<User>;
  }

  constructor(private _authService: AuthService, private _postsService: PostsApi) {
  }
}
