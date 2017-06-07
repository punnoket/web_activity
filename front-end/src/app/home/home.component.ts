import { Component, OnInit } from '@angular/core';

import { GetAcService } from '../getactivity.service';



import {LoginService} from '../login.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private objectData: any;
  constructor(private loginService: LoginService, private getactivity: GetAcService) {
    this.getactivity.getActivity().subscribe(data => this.getActivityData(data))
  }


  ngOnInit() {
  }


  private getActivityData = function(value) {
    console.log(JSON.parse(value._body));
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
