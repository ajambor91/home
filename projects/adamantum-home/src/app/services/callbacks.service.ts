import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {ParsedPostTree} from "../models/posts-tree.model";

@Injectable()
export class CallbacksService {
  private _intrussionFinalCallback: Subject<void> = new Subject();

  public get intrussionFinalCallback(): Observable<void> {
    return this._intrussionFinalCallback.asObservable();
  }

  private _componentCreatedCallback: Subject<void> = new Subject();

  public get componentCreatedCallback(): Observable<void> {
    return this._componentCreatedCallback.asObservable();
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

  public setIntrussionFinalCallback(): void {
    this._intrussionFinalCallback.next();
  }

  public setArticleComponentCallback(value: ParsedPostTree): void {
    this._articleComponentCallback.next(value);
  }

  public setCommandComponentCallback(): void {
    this._commandComponentCallback.next();
  }

  public setCommandOutputComponentCallback(): void {
    this._commandOutputComponentCallback.next();
  }

  public setComponentCreatedCallback(): void {
    this._componentCreatedCallback.next();
  }

  public createCallback<T>(): Subject<T> {
    return new Subject<T>();
  }
}
