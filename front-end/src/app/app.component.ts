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
  private objectData: any

  constructor(loginService: LoginService) {
    loginService.login().subscribe(data => this.doSomething(data));

  }
  private doSomething = function(value) {
    console.debug(value[0]);
  }
}
