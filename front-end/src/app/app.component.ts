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

  constructor(private loginService: LoginService) {


  }
  login(username: String, password: String) {
    console.log(username)
    this.loginService.login(username, password).subscribe(data => this.getUserData(data));
  }

  loginFacebook() {

    this.loginService.loginFacebook().subscribe(data => this.getUserData(data));
  }
  private getUserData = function(value) {
    console.log(JSON.parse(value._body));
    let data = JSON.parse(value._body)
    if (data.success == false) {
      alert(data.text)
    } else {
      alert(data.text)
    }
  }

  private getUserDataFacebook = function(value) {
    console.log(JSON.parse(value._body));
    let data = JSON.parse(value._body)
    if (data.success == false) {
      alert(data.text)
    } else {
      alert(data.text)
    }
  }
}
