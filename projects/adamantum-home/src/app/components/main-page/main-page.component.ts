import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DynamicComponentService} from "../../services/dynamic-component.service";
import {GreetingsService} from "../../services/greetings.service";
import {GreetingComponentComponent} from "./greeting-component/greeting-component.component";
import {InputComponent} from "../generic/input/input.component";
import {Router, RouterModule} from "@angular/router";
import {CallbacksService} from "../../services/callbacks.service";
import {ParsedPostTree} from "../../models/posts-tree.model";
import {switchMap, tap} from "rxjs";
import {RoutePathHelper} from "../../helpers/route-path.helper";

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  providers: [GreetingsService],
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GreetingComponentComponent,
    InputComponent,
    RouterModule
  ]
})
export class MainPageComponent implements OnInit, AfterViewInit {
  public currentTime!: string;
  private _RoutePathHelper: typeof RoutePathHelper = RoutePathHelper;

  constructor(
    private _zone: NgZone,
    private _greetingsService: GreetingsService,
    private _dynamicComponentService: DynamicComponentService,
    private _callbackService: CallbacksService,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) {
  }

  private _navContainer!: ViewContainerRef;

  @ViewChild('navContainer', {read: ViewContainerRef})
  public set navContainer(vcr: ViewContainerRef) {
    this._navContainer = vcr;
  }

  public get lastLoginDate(): string | null {
    return this._greetingsService.getLastLogin();
  }

  public ngOnInit(): void {
    this._addArticleComponent();
    this._updateTime();
  }

  public ngAfterViewInit(): void {
    this._getLastLoginDate();
    setTimeout(() => {
      this._dynamicComponentService.createNav(this._navContainer);
    }, 200);
  }

  private _getLastLoginDate(): void {
    this._greetingsService.setLoginDate();
  }

  private _updateTime(): void {
    this._zone.runOutsideAngular(() => {
      this._setTime();
      setInterval(() => {
        this._zone.run(() => {
          this._setTime();
        });
      }, 1000);
    });
  }

  private _setTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-GB', {hour12: false});
    this._cdr.detectChanges();
  }

  private _addArticleComponent(): void {
    this._callbackService.articleComponentCallback.pipe(
      tap((article: ParsedPostTree) => {
        this._dynamicComponentService.addArticleComponent(this._navContainer, article);
        this._router.navigate([this._RoutePathHelper.createPath(article)], {replaceUrl: true});
      }),
      switchMap(() => this._callbackService.componentCreatedCallback)
    ).subscribe(() => {
      this._dynamicComponentService.createNav(this._navContainer);
    });
  }
}
