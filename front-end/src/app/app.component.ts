import { Component } from '@angular/core';
import {LoginService} from './login.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private loginService: LoginService
  private objectData: any

  constructor() {
    this.loginService.login().subscribe(data => this.objectData = data);

  }
}
