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
  private choices
  private keyJoin
  private checkJoin = true
  private idJoin
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

  public getChoices(id: String) {

    for (let i of this.activities) {
      if (id === i._id) {
        this.choices = i.choice
        console.log(i.name)
      }
    }
  }

  public join(id: String) {
    this.idJoin = id
    for (let i of this.activities) {
      if (id === i._id) {
        this.keyJoin = i.key
        console.log(i.key)
      }
    }
  }

  public checkMatchKey(key: String) {

    if (this.keyJoin === key) {
      this.checkJoin = true
      console.log("join !!")
      this.getactivity.join(this.idJoin).subscribe(data => this.getJoinData(data))
    } else {
      this.checkJoin = false
    }
  }

  private getJoinData = function(value) {
    console.log(JSON.parse(value._body));

  }



}
