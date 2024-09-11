import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {IRouteEx} from "../app.routes";

@Injectable()
export class CallbacksService {
  private _intrussionFinalCallback: Subject<void> = new Subject();

  public get intrussionFinalCallback(): Observable<void> {
    return this._intrussionFinalCallback.asObservable();
  }

  private _genericComponentCallback: Subject<IRouteEx> = new Subject();

  public get genericComponentCallback(): Observable<IRouteEx> {
    return this._genericComponentCallback.asObservable();
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

  public setGenericComponentCallback(value: IRouteEx): void {
    this._genericComponentCallback.next(value);
  }

  public setCommandComponentCallback(): void {
    this._commandComponentCallback.next();
  }

  public setCommandOutputComponentCallback(): void {
    this._commandOutputComponentCallback.next();
  }

  public createCallback<T>(): Subject<T> {
    return new Subject<T>();
  }
}
