import {RouterModule} from "@angular/router";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from "@angular/core";
import {GreetingComponentComponent} from "../greeting-component/greeting-component.component";
import {InputComponent} from "../../generic/input/input.component";
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {PostEntity} from "../../../../../../adamantum-shared-types";
import {CallbacksService} from "../../../services/callbacks.service";


@Component({
  selector: 'app-generic-post',
  standalone: true,
  templateUrl: './generic-post.component.html',
  styleUrls: ['./generic-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [
    GreetingComponentComponent,
    InputComponent,
    RouterModule,
    NgIf,
    AsyncPipe,
    JsonPipe
  ]
})
export class GenericPostComponent {
  public post!: PostEntity;

  constructor(private _cdr: ChangeDetectorRef, private _callbackService: CallbacksService) {
  }

  public updateContent(content: PostEntity): void {
    this.post = content;
    this._cdr.detectChanges();
    this._callbackService.setComponentCreatedCallback();
  }

}
