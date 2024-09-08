import {Injectable} from "@angular/core";
import {IEnvironments} from "../core/environments.model";
import { environment } from '../../environments/environment'

@Injectable({providedIn: 'root'})
export class EnvironmentsService {
  private environment: IEnvironments = environment;
  public get apiUrl(): string {
    return this.environment.apiUrl;
  }


}
