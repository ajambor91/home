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
  @ViewChild('navContainer', {read: ViewContainerRef}) private navContainer!: ViewContainerRef;

  constructor(private zone: NgZone, private greetingsService: GreetingsService, private dynamicComponentService: DynamicComponentService, private callbackService: CallbacksService, private router: Router, private cdr: ChangeDetectorRef) {

  }

  public get lastLoginDate(): string | null {
    return this.greetingsService.getLastLogin();
  }

  ngOnInit(): void {
    this.addArticleComponent();
    this.updateTime();
  }

  ngAfterViewInit() {
    this.getLastLoginDate();
    setTimeout(() => {
      this.dynamicComponentService.createNav(this.navContainer)
    }, 200)

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

  private getLastLoginDate(): void {
    this.greetingsService.setLoginDate();
  }

  private updateTime(): void {
    this.zone.runOutsideAngular(() => {
      this.setTime();
      setInterval(() => {
        this.zone.run(() => {
          this.setTime();
        });
      }, 1000);
    });
  }

  private setTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-GB', {hour12: false});
    this.cdr.detectChanges();
  }

  private addArticleComponent(): void {
    this.callbackService.articleComponentCallback.pipe(
      tap((article: ParsedPostTree) => {
        this.dynamicComponentService.addArticleComponent(this.navContainer, article);
        this.router.navigate([this.createLink(article)], {replaceUrl: true});
      }),
      switchMap(() => this.callbackService.componentCreatedCallback)
    ).subscribe(() => {
      this.dynamicComponentService.createNav(this.navContainer)
    });
  }

}
