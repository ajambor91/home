import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {IEnvironments} from "../models/environment.model";


@Injectable()
export class BunldeEnvironmentsService {
  private environment: IEnvironments = environment;
  public get apiUrl(): string {
    return this.environment.apiUrl;
  }


}
