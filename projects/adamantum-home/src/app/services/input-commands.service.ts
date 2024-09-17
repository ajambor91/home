import {Injectable} from "@angular/core";


// TODO: Implement command functionality similar to Unix-based terminal for improved user interaction
@Injectable()
export class InputCommandsService {
  private readonly inputCommands: Map<string, string> = new Map([
    ['help', 'help'],
    ['shutdown', 'shutdown'],
    ['ls', 'ls']
  ])
}
