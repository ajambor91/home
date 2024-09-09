import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {Posts, User} from "shared-types";
import {Observable} from "rxjs";
import {PostsListComponent} from "./posts-list/posts-list.component";
import {PostsService} from "../../services/posts.service";
import {SideNavComponent} from "./side-nav/side-nav.component";

@Component({
  selector: 'app-main',
  standalone: true,
  providers: [PostsService],
  imports: [RouterOutlet, PostsListComponent, SideNavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

  public posts$: Observable<Posts> = this._postsService.getPosts$();
  public user$: Observable<User> = this._authService.getCurrentUser() as Observable<User>;

  constructor(private _authService: AuthService, private _postsService: PostsService) {
  }
}
