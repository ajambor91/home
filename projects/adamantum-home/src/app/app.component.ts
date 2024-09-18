import {AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LocalDataService} from "./services/local-data.service";
import {DynamicComponentService} from "./services/dynamic-component.service";
import {CallbacksService} from "./services/callbacks.service";
import {filter, take} from "rxjs";
import {EnvironmentsService} from "./services/environments.service";
import {Store} from "@ngrx/store";
import {loadPosts} from "./store/posts.actions";
import {selectAllPosts} from "./store/posts.selectors";
import {ParsedPostTree} from "./models/posts-tree.model";

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  providers: [LocalDataService, DynamicComponentService, CallbacksService, EnvironmentsService, Store],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {

  @ViewChild('mainContainer', {read: ViewContainerRef}) private _mainContainer!: ViewContainerRef;

  constructor(
    private _dynamicComponentsService: DynamicComponentService,
    private _callbackService: CallbacksService,
    private _store: Store,
  ) {
  }

  public ngAfterViewInit(): void {
    this._loadComponentURLBased();
  }

  // TODO: Refactor - Move relevant methods to a service for better separation of concerns and maintainability

  private _loadComponentURLBased(): void {
    const currentURL = document.location.pathname;
    if (currentURL === '/') {
      this._store.dispatch(loadPosts());
      this._dynamicComponentsService.createIntrusion(this._mainContainer);
      this._callbackService.intrussionFinalCallback.pipe(take(1)).subscribe(() => {
        this._dynamicComponentsService.destroyIntrussion(this._mainContainer);
        this._dynamicComponentsService.createMainPage(this._mainContainer);
        this._callbackService.setIsViaRouteSignal(null);
      });
    } else {
      this._store.dispatch(loadPosts());
      this._store.select(selectAllPosts).pipe(
        filter(posts => !!posts && posts.length > 0),
        take(1)
      ).subscribe(result => {
        const splittedPath: string[] = decodeURIComponent(currentURL.replace(/^\/article\//, '')).split('/');
        const item: ParsedPostTree = this._findComponent(splittedPath, result)[0];
        this._dynamicComponentsService.createMainPage(this._mainContainer);
        this._callbackService.setIsViaRouteSignal(item);
      });
    }
  }

  private _findComponent(splittedPath: string[], posts: ParsedPostTree[], index: number = 0): ParsedPostTree[] {
    const pathFragment: string = splittedPath[index];
    const pathArr: ParsedPostTree[] = [];

    for (let i: number = 0; i < posts.length; i++) {
      const post: ParsedPostTree = posts[i];

      if (post.parentCategoryName === pathFragment || post.categoryName === pathFragment || post.postTitle === pathFragment) {
        if (!!post.children && post.children.length > 0) {
          const foundFragments: ParsedPostTree[] = this._findComponent(splittedPath, post.children, index + 1);
          pathArr.push(...foundFragments);
          break;
        } else {
          pathArr.push(post);
          break;
        }
      }
    }
    return pathArr;
  }
}
