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
  private activities
  constructor(private loginService: LoginService, private getactivity: GetAcService) {
    this.getactivity.getActivity().subscribe(data => this.getActivityData(data))
  }


  ngOnInit() {
  }


  private getActivityData = function(value) {
    console.log(JSON.parse(value._body));
    this.activities = JSON.parse(value._body).activity
    console.log(this.check)
  }



}
