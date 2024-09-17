import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {PostsService} from "../../../../services/posts.service";
import {AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf, NgSwitch, NgTemplateOutlet} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {CallbacksService} from "../../../../services/callbacks.service";
import {ParsedPostTree} from "../../../../models/posts-tree.model";
import {RoutePathHelper} from "../../../../helpers/route-path.helper";
import {DynamicComponentService} from "../../../../services/dynamic-component.service";

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
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
export class RoutesComponent implements AfterViewInit {
  @Input() public lastLoginDate!: string | null;
  public RoutePathHelper: typeof RoutePathHelper = RoutePathHelper;
  public routes$: Observable<ParsedPostTree[] | null> = this._postsService.getPosts$();
  @ViewChild('commandElement') private _commandElement!: ElementRef;

  constructor(
    private _postsService: PostsService,
    private _callbackService: CallbacksService,
    private _dynamicComponentService: DynamicComponentService
  ) {
  }

  public ngAfterViewInit(): void {
    this._routeByURL();
  }

  public selectAndPassComponent(route: ParsedPostTree): void {
    this._callbackService.setArticleComponentCallback(route);
  }

  private _routeByURL(): void {
    this._dynamicComponentService.routeByURL();
  }
}
