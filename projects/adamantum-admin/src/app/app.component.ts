import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SideNavComponent} from "./components/main/side-nav/side-nav.component";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin';

  constructor(private _authService: AuthService) {
    this.initializeApp();
  }

  private initializeApp(): void {
    this._authService.loginByStorage();
  }
}
