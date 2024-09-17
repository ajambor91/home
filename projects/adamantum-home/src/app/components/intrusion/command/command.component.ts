import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import Typed from 'typed.js';
import {CallbacksService} from '../../../services/callbacks.service';

@Component({
  selector: 'app-command-output-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements AfterViewInit {

  @Input() public input!: string[];
  @ViewChild('commandElement') public commandElement!: ElementRef;

  private _typed!: Typed;

  constructor(private _callbacksService: CallbacksService) {
  }

  public ngAfterViewInit(): void {
    this._typed = new Typed(this.commandElement.nativeElement, {
      strings: this.input,
      typeSpeed: 50,
      onComplete: () => this._callbacksService.setCommandComponentCallback()
    });
  }
}
