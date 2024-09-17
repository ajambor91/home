import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ParsedPostTree} from "../models/posts-tree.model";

@Injectable()
export class CallbacksService {
  // Private variables
  private _intrussionFinalCallback: Subject<void> = new Subject();

  // Public getters
  public get intrussionFinalCallback(): Observable<void> {
    return this._intrussionFinalCallback.asObservable();
  }

  private _isViaRouteSignal: BehaviorSubject<ParsedPostTree | null | undefined> = new BehaviorSubject<ParsedPostTree | null | undefined>(undefined);

  public get isViaRouteSignal(): Observable<ParsedPostTree | null | undefined> {
    return this._isViaRouteSignal.asObservable();
  }

  private _componentCreatedCallback: Subject<void> = new Subject();

  public get componentCreatedCallback(): Observable<void> {
    return this._componentCreatedCallback.asObservable();
  }

  private _commandCallback: Subject<void> = new Subject();

  public get commandCallback(): Observable<void> {
    return this._commandCallback.asObservable();
  }

  private _articleComponentCallback: Subject<ParsedPostTree> = new Subject();

  public get articleComponentCallback(): Observable<ParsedPostTree> {
    return this._articleComponentCallback.asObservable();
  }

  private _commandComponentCallback: Subject<void> = new Subject();

  public get commandComponentCallback(): Observable<void> {
    return this._commandComponentCallback.asObservable();
  }

  private _commandOutputComponentCallback: Subject<void> = new Subject();

  public get commandOutputComponentCallback(): Observable<void> {
    return this._commandOutputComponentCallback.asObservable();
  }

  // Public methods
  public setIntrussionFinalCallback(): void {
    this._intrussionFinalCallback.next();
  }

  public setArticleComponentCallback(value: ParsedPostTree): void {
    this._articleComponentCallback.next(value);
  }

  public setCommandComponentCallback(): void {
    this._commandComponentCallback.next();
  }

  public setIsViaRouteSignal(isRouted: ParsedPostTree | null): void {
    this._isViaRouteSignal.next(isRouted);
  }

  public setCommandOutputComponentCallback(): void {
    this._commandOutputComponentCallback.next();
  }

  public setComponentCreatedCallback(): void {
    this._componentCreatedCallback.next();
  }

  public setCommandCallback(): void {
    this._commandCallback.next();
  }
}
