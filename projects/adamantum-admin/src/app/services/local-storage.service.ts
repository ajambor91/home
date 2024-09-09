import {Injectable} from "@angular/core";
import {LocalStorageKey, LocalStorageModel} from "../core/local-storage.model";
import {EnvironmentsService} from "./environments.service";
import {User} from "shared-types";

@Injectable({providedIn: "root"})
export class LocalStorageService {
  private readonly appKey: string = this. _environmentsService.appDataKey;

  constructor(private _environmentsService: EnvironmentsService) {
  }
  public getData(): LocalStorageModel | null{
    return this.getFromStore();
  }

  public getToken(): string | null{
    return this.getFromStore()?.token || null;
  }

  public getUser(): User {
    return this.getFromStore()?.user as User;
  }

  public setUser(user: User): void {
    this.setData('user', user);
  }

  public setToken(token: string): void {
    this.setData('token', token)
  }

  private setData(key: LocalStorageKey, value: any): void {
    let dataToSet: LocalStorageModel;
    const data: LocalStorageModel | null = this.getFromStore();
    if (!data) {
      dataToSet = {} as LocalStorageModel;
    } else  {
      dataToSet = data;
    }
    dataToSet[key] = value;
    localStorage.setItem(this.appKey, JSON.stringify(dataToSet))
  }

  private getFromStore(): LocalStorageModel | null{
    let storageData: string | null = localStorage.getItem(this.appKey);
    if (!!storageData) {
      return JSON.parse(localStorage.getItem(this.appKey) as string) as LocalStorageModel;
    }
    return null;
  }
}
