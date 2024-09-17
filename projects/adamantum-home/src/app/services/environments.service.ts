import {IEnvironments} from "../models/environments.model";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";


@Injectable({providedIn: 'root'})
export class EnvironmentsService {
  private _environment: IEnvironments = environment;

  public get apiUrl(): string {
    return this._environment.apiUrl;
  }


}
