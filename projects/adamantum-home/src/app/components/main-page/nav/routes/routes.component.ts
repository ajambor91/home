import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {RoutesService} from "../../../../services/routes.service";
import {AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ITreeNodeRoutes} from "../../../../models/route.model";
import {Observable, switchMap, tap} from "rxjs";
import {CallbacksService} from "../../../../services/callbacks.service";
import {Store} from "@ngrx/store";
import {selectAllPosts} from "../../../../store/posts.selectors";


@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
  providers: [RoutesService],
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    NgForOf,
    RouterLink,
    AsyncPipe,
    NgIf,
    JsonPipe,
    NgClass
  ]
})
export class RoutesComponent {
  @ViewChild('commandElement') commandElement!: ElementRef;


  @Input() public lastLoginDate!: string | null;


  public routes$: Observable<ITreeNodeRoutes> = this.store.select(selectAllPosts).pipe(
    tap(store => console.log(store)),
    switchMap(() => this.routeService.getRoutes())
  );


  constructor(private routeService: RoutesService, private callbackService: CallbacksService, private store: Store) {

  }


  public selectAndPassComponent(route: any): void {
    // this.callbackService.setGenericComponentCallback(route);
  }

}
