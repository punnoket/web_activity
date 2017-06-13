import { Component } from '@angular/core';
import {LoginService} from './login.service';
import { Subscription } from 'rxjs/Subscription';
import { GetAcService } from './getactivity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private objectData: any
  private check = false

  constructor(private loginService: LoginService, private getactivity: GetAcService) {
    this.getactivity.checkAuth().subscribe(data => this.getAuthData(data))

  }
  private getAuthData = function(value) {

    this.check = JSON.parse(value._body).success

  }

  login(username: String, password: String) {
    console.log(username)
    this.loginService.login(username, password).subscribe(data => this.getUserData(data));
  }

  private getUserData = function(value) {
    console.log(JSON.parse(value._body));
    let data = JSON.parse(value._body)
    window.location.href = '/'

  }

  logout() {

    this.loginService.logout().subscribe(data => this.getData(data));
  }

  private getData = function(value) {
    window.location.href = '/'

  }
}