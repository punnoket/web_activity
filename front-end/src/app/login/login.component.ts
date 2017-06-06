import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  title = 'app works!';
  private objectData: any;
  private check = true;

  constructor(private loginService: LoginService) {


  }
  ngOnInit() {

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

      this.check = false;
      return false
    } else {

      this.check = true;
      window.location.href = '/home'
      return true

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
