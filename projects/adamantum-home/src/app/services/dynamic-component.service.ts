import {ComponentRef, Injectable, Type, ViewContainerRef} from "@angular/core";
import {concatMap, filter, map, Observable, Subscription, switchMap, take, tap} from "rxjs";
import {CommandBlockComponent} from "../components/intrusion/command-block/command-block.component";
import {CommandOutputComponent} from "../components/intrusion/command-output/command-output.component";
import {CommandComponent} from "../components/intrusion/command/command.component";
import {LocalDataService} from "./local-data.service";
import {ELocalDataEnum} from "../enums/local-data.enum";
import {ICommandComponentsData} from "../models/local-data.model";
import {IntrusionComponent} from "../components/intrusion/intrusion.component";
import {MainPageComponent} from "../components/main-page/main-page.component";
import {CallbacksService} from "./callbacks.service";
import {NavComponent} from "../components/main-page/nav/nav.component";
import {RoutesComponent} from "../components/main-page/nav/routes/routes.component";
import {GenericPostComponent} from "../components/main-page/generic-post/generic-post.component";
import {ParsedPostTree} from "../models/posts-tree.model";
import {PostsService} from "./posts.service";

@Injectable()
export class DynamicComponentService {
  private _intrussionSubs: Subscription = new Subscription();
  private _isLastCommand: boolean = false;

  constructor(
    private _localDataService: LocalDataService,
    private _callbacksService: CallbacksService,
    private _postsService: PostsService
  ) {
  }

  public createCommandComponent(container: ViewContainerRef, component: Type<CommandComponent>, input: any): Observable<void> {
    const componentRef: ComponentRef<CommandComponent> = container.createComponent(component);
    componentRef.instance.input = input;

    return this._callbacksService.commandComponentCallback.pipe(take(1));
  }

  public createCommandBlockComponent(index: number, container: ViewContainerRef): void {
    this._localDataService.getData(ELocalDataEnum.COMMANDS).pipe(
      switchMap((commands: ICommandComponentsData[]) => {
        if (index >= commands.length) {
          this._isLastCommand = true;
          return new Observable<void>(observer => observer.complete());
        }

        const componentRef: ComponentRef<CommandBlockComponent> = container.createComponent(CommandBlockComponent);
        componentRef.instance.command = commands[index].inputs["command"] as string[];
        componentRef.instance.output = commands[index].inputs["output"] as string[];
        componentRef.instance.commandsLength = commands.length;

        const newIndex: number = index + 1;

        const sub: Subscription = this._callbacksService.commandComponentCallback.subscribe(() => this.createCommandBlockComponent(newIndex, container));
        this._intrussionSubs.add(sub);

        return new Observable<void>(observer => observer.complete());
      })
    ).subscribe();
  }

  public createCommandOutputComponent(
    container: ViewContainerRef,
    component: Type<CommandOutputComponent>,
    outputs: any[]
  ): Observable<void> {
    let i = 0;
    return new Observable<void>((observer) => {
      const outputCreationInterval = setInterval(() => {
        if (i >= outputs.length) {
          if (this._isLastCommand === true) {
            this._callbacksService.setIntrussionFinalCallback();
          }
          clearInterval(outputCreationInterval);
          observer.next();
          observer.complete();
        } else {
          const componentRef: ComponentRef<CommandOutputComponent> = container.createComponent(component);
          componentRef.instance.input = outputs[i];

          i++;
        }
      }, 100);
    });
  }

  public createIntrusion(container: ViewContainerRef): void {
    container.createComponent(IntrusionComponent);
  }

  public createMainPage(container: ViewContainerRef): void {
    container.createComponent(MainPageComponent);
  }

  public destroyIntrussion(container: ViewContainerRef): void {
    this._intrussionSubs.unsubscribe();
    container.clear();
  }

  public createNav(container: ViewContainerRef): void {
    container.createComponent(NavComponent);
  }

  public createRoutes(container: ViewContainerRef): void {
    container.createComponent(RoutesComponent);
  }

  public addArticleComponent(container: ViewContainerRef, route: ParsedPostTree): void {
    this._postsService.getPostFromStore$(route).pipe(
      take(1),
      concatMap((postData) => this._callbacksService.commandCallback.pipe(
        take(1),
        map(() => postData)))
    ).subscribe(postData => {
      const componentRef: ComponentRef<any> = container.createComponent(GenericPostComponent as Type<any>);
      componentRef.instance.updateContent(postData);
    });
  }

  public routeByURL(): void {
    this._callbacksService.isViaRouteSignal.pipe(
      take(1),
      filter(route => !!route),
      tap(() => this._callbacksService.setIsViaRouteSignal(null))
    ).subscribe(post => this._callbacksService.setArticleComponentCallback(post as ParsedPostTree));
  }
}
