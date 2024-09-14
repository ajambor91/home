import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {PostsService} from "../../../../services/posts.service";
import {AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {ITreeNodeRoutes} from "../../../../models/route.model";
import {Observable, tap} from "rxjs";
import {CallbacksService} from "../../../../services/callbacks.service";
import {Store} from "@ngrx/store";
import {PostsTree} from "../../../../../../../adamantum-shared-types";
import {PostsTransformer} from "../../../../transformers/posts.transformer";
import {ApiService} from "../../../../services/api.service";
import {FORMATTERS_TOKEN} from "../../../../core/formatters.token";
import {PostsFormatter} from "../../../../formatters/post-tree.formatter";
import {Processor} from "../../../../core/processor";
import {ParsedPostTree} from "../../../../models/posts-tree.model";
import {IFormatInterface} from "../../../../core/formatter.interfaces";
import {PostsApiService} from "../../../../../../../adamantum-api-reqs/src/lib/posts/posts.api.service";


@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
  providers: [
  ],
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


  public routes$: Observable<ITreeNodeRoutes> = this.postsService.getPosts().pipe(
    tap(store => console.log(store))
  );


  constructor(private postsService: PostsService, private callbackService: CallbacksService, private store: Store) {

  }


  public selectAndPassComponent(route: any): void {
    // this.callbackService.setGenericComponentCallback(route);
  }

}
