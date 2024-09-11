import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {AsyncPipe, JsonPipe, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {Action, ActionTypes, TableConfig} from "../../../core/table.config";
import {PostFormComponent} from "../../main/post-form/post-form.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, PostFormComponent, NgForOf, NgIf, NgSwitch, NgSwitchCase],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TableComponent {
  @Input() public tableConfig: TableConfig = [];
  @Output() action: EventEmitter<Action> = new EventEmitter<Action>()

  private _tableData!: object[];

  public get tableData(): any[] {
    return this._tableData;
  }

  @Input()
  public set tableData(data: any) {
    if (Array.isArray(data)) {
      this._tableData = data;
    }
  }

  public runAction(action: ActionTypes | undefined, params: any) {
    if (!!action) {
      this.action.emit({
        action, params
      })
    }
  }

}
