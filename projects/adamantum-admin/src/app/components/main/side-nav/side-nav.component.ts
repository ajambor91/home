import {ChangeDetectionStrategy, Component} from "@angular/core";
import {PostsService} from "../../../services/posts.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {PostsListComponent} from "../posts-list/posts-list.component";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-side-nav',
  standalone: true,
  providers: [PostsService],
  imports: [RouterOutlet, PostsListComponent, RouterLink, NgIf],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent {
  public isPostsOpened: boolean = false;
  public isCategoriesOpened: boolean = false;

  public togglePosts(): void {
    this.isPostsOpened = !this.isPostsOpened;
  }

  public toggleCategories(): void {
    this.isCategoriesOpened = !this.isCategoriesOpened;
  }

}
