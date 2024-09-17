import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import Typed from "typed.js";
import {DynamicComponentService} from "../../../services/dynamic-component.service";
import {CallbacksService} from "../../../services/callbacks.service";
import {RoutePathHelper} from "../../../helpers/route-path.helper";
import {take} from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements AfterViewInit, OnInit {
  @Input() public lastLoginDate!: string | null;

  @ViewChild('commandElement') private _commandElement!: ElementRef;
  @ViewChild('secondCommandElement') private _secondCommandElement!: ElementRef;
  @ViewChild('navContainer', {read: ViewContainerRef}) private _navContainer!: ViewContainerRef;

  private _typed!: Typed;
  private _RoutePathHelper: typeof RoutePathHelper = RoutePathHelper;

  constructor(
    private _dynamicComponentService: DynamicComponentService,
    private _callbacksService: CallbacksService
  ) {
  }

// TODO: Replace command string with a constant for better maintainability and consistency
  public ngAfterViewInit(): void {
    const routesCreator: () => void = this._createRoutesComponent.bind(this);
    this._typed = new Typed(this._commandElement.nativeElement, {
      strings: ['> ls -R'],
      typeSpeed: 50,
      onComplete(self: Typed) {
        routesCreator();
      },
    });
  }

  public ngOnInit(): void {
    this._setCommande();
  }

// TODO: Replace command string with a constant for better maintainability and consistency
  private _setCommande(): void {
    const commandCallback: () => void = this._signalCommand.bind(this);
    this._callbacksService.articleComponentCallback.pipe(
      take(1),
    ).subscribe((route) => {
      this._typed = new Typed(this._secondCommandElement.nativeElement, {
        strings: [`cat ${this._RoutePathHelper.createPath(route)}`],
        typeSpeed: 50,
        onComplete(self: Typed) {
          commandCallback();
        },
      });
    });
  }

  private _signalCommand(): void {
    this._callbacksService.setCommandCallback();
  }

  private _createRoutesComponent(): void {
    this._dynamicComponentService.createRoutes(this._navContainer);
  }

  private _destroyLogic(): void {
    for (let key in this) {
      delete this[key];
    }
  }
}
