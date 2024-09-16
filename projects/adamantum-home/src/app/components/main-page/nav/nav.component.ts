import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import Typed from "typed.js";
import {DynamicComponentService} from "../../../services/dynamic-component.service";
import {CallbacksService} from "../../../services/callbacks.service";
import {RoutePathHelper} from "../../../helpers/route-path.helper";
import { take } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,


})
export class NavComponent implements AfterViewInit, OnInit {
  @ViewChild('commandElement') commandElement!: ElementRef;
  @ViewChild('secondCommandElement') secondCommandElement!: ElementRef;

  @Input() public lastLoginDate!: string | null;
  @ViewChild('navContainer', {read: ViewContainerRef}) private navContainer!: ViewContainerRef;

  private typed!: Typed;
  private RoutePathHelper: typeof RoutePathHelper = RoutePathHelper;

  constructor(private dynamicComponentService: DynamicComponentService, private callbacksService: CallbacksService) {
  }

  public ngAfterViewInit(): void {
    const routesCreator: () => void = this.createRoutesComponent.bind(this)
    this.typed = new Typed(this.commandElement.nativeElement, {
      strings: ['> ls -R'],
      typeSpeed: 50,
      onComplete(self: Typed) {
        routesCreator();
      }
    });
  }

  public ngOnInit(): void {
    this.setCommande();
  }

  private setCommande(): void {
    const commandCallback: () => void = this.signalCommand.bind(this)
    this.callbacksService.articleComponentCallback.pipe(take(1)).subscribe((route) => {
      this.typed = new Typed(this.secondCommandElement.nativeElement, {
        strings: [`cat ${RoutePathHelper.createPath(route)}`],
        typeSpeed: 50,
        onComplete(self: Typed) {
          commandCallback();
        }
      });
    });
  }
  private signalCommand(): void {
    this.callbacksService.setCommandCallback();
  }
  private createRoutesComponent(): void {
    this.dynamicComponentService.createRoutes(this.navContainer)
  }

}
