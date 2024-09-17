import {AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DynamicComponentService} from "../../services/dynamic-component.service";

@Component({
  selector: 'app-intrusion',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './intrusion.component.html',
  styleUrls: ['./intrusion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntrusionComponent implements AfterViewInit {

  @ViewChild('commandContainer', {read: ViewContainerRef}) private _commandContainer!: ViewContainerRef;

  constructor(private _dynamicComponentService: DynamicComponentService) {
  }

  public ngAfterViewInit(): void {
    this._createCommandBlock();
  }

  private _createCommandBlock(index: number = 0): void {
    this._dynamicComponentService.createCommandBlockComponent(index, this._commandContainer);
  }
}
