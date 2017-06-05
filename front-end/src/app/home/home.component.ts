import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private objectData: any;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
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
