import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {PostsService} from "../../../../services/posts.service";
import {AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf, NgSwitch, NgTemplateOutlet} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {CallbacksService} from "../../../../services/callbacks.service";
import {Store} from "@ngrx/store";
import {ParsedPostTree} from "../../../../models/posts-tree.model";


@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    NgForOf,
    RouterLink,
    AsyncPipe,
    NgIf,
    JsonPipe,
    NgClass,
    NgSwitch,
    NgTemplateOutlet
  ]
})
export class RoutesComponent {
  @ViewChild('commandElement') commandElement!: ElementRef;


  @Input() public lastLoginDate!: string | null;


  public routes$: Observable<ParsedPostTree[] | null> = this.postsService.getPosts$();


  constructor(private postsService: PostsService, private callbackService: CallbacksService, private store: Store) {

  }

  public createLink(item: ParsedPostTree): string {
    if (!!item.categoryParentId) {
      return `/article/${item.parentCategoryName}/${item.categoryName}/${item.postTitle}`;
    } else if (!!item.categoryId) {
      return `/article/${item.categoryName}/${item.postTitle}`
    } else {
      return `/article/${item.postTitle}`
    }
  }

  public selectAndPassComponent(route: ParsedPostTree): void {
    this.callbackService.setArticleComponentCallback(route);
  }

}
