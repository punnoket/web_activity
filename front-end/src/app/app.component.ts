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
  private check = false

  constructor(private loginService: LoginService) {


  }

  login(username: String, password: String) {
    console.log(username)
    this.loginService.login(username, password).subscribe(data => this.getUserData(data));
  }

  private getUserData = function(value) {
    console.log(JSON.parse(value._body));
    let data = JSON.parse(value._body)
    if (data.success == false) {

      this.check = false;
      return false
    } else {

      this.check = true;
      window.location.href = '/home'
      return true

    }
  }

  logout() {

    this.loginService.logout().subscribe(data => this.getData(data));
  }

  private getData = function(value) {
    console.log(JSON.parse(value._body));
    let data = JSON.parse(value._body)
    if (data.success) {
      window.location.href = '/'
    }


  }
}
