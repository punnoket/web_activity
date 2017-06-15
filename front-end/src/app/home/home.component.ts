import { Component, OnInit, Input} from '@angular/core';
import { GetAcService } from '../getactivity.service';

import { AppComponent } from '../app.component';

import { LoginService } from '../login.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private objectData: any;
  private activities
  private activitiesTemp
  private choices
  private keyJoin
  private keyVote
  private checkJoin = true
  private idJoin
  private idVote
  private indexOfChoice
  private checkAuth
  private user
  private slideIndex = 0;




  constructor(private loginService: LoginService, private getactivity: GetAcService) {

    this.getactivity.getActivity().subscribe(data => this.getActivityData(data))
    this.getactivity.checkAuth().subscribe(data => this.getAuthData(data))

    this.loginService.getUserData().subscribe(data => this.getUserData(data))

  }




  ngOnInit() {
    this.showDivs(this.slideIndex);
  }

  private getUserData = function(value) {

    this.user = JSON.parse(value._body).user
    console.log(this.user)

  }

  public test() {
    this.getactivity.checkAuth().subscribe(data => this.getAuthData(data))
  }


  private getActivityData = function(value) {
    console.log(JSON.parse(value._body));

    this.activities = JSON.parse(value._body).activity
    this.activitiesTemp = JSON.parse(value._body).activity

  }

  private getAuthData = function(value) {

    this.checkAuth = JSON.parse(value._body).success
    console.log(this.checkAuth)

  }

  public getChoices(id: String, acctivity: Object) {
    console.log(acctivity)
    this.idVote = id
    for (let i of this.activities) {
      if (id === i._id) {
        this.choices = i.choice
        this.keyVote = i.key
        console.log(i.key)
      }
    }
  }

  public join(id: String, acctivity: Object) {
    console.log(acctivity)
    this.idJoin = id
    for (let i of this.activities) {
      if (id === i._id) {
        this.keyJoin = i.key
        console.log(i.key)
      }
    }
  }

  public checkMatchKey(key: String) {
    let check = true
    for (let idAc of this.user.history_activity) {
      console.log(idAc === this.idJoin)
      if (idAc === this.idJoin) {
        check = false
      }
    }
    if (this.keyJoin === key) {
      this.checkJoin = true
      console.log("join !!!")
      if (check) {
        this.getactivity.join(this.idJoin).subscribe(data => this.getData(data))
        window.location.href = '/'
      } else {
        alert("ไม่สามารถกดเข้าร่วมซ้ำได้")
        window.location.href = '/'
      }
    } else {

      alert("wrong key !!!")
    }
  }

  public checkMatchKeyVote(key: String) {

    let check = true
    for (let idAc of this.user.history_activity) {

      if (idAc === this.idVote) {
        check = false
      }
    }

    if (this.keyVote === key) {

      console.log("vote !!!")
      if (check) {
        this.getactivity.vote(this.idVote, this.indexOfChoice).subscribe(data => this.getData(data))
        window.location.href = '/'
      } else {
        alert("ไม่สามารถกดเข้าร่วมซ้ำได้")
        window.location.href = '/'
      }
    } else {

      alert("wrong key !!!")
    }

  }

  private getData = function(value) {
    console.log(JSON.parse(value._body));
    if (!(JSON.parse(value._body).success)) {
      alert("please Login")
    }

  }

  public onSelectionChange(index: number) {
    this.indexOfChoice = index
  }





  public plusDivs(n: number) {

    this.showDivs(this.slideIndex += n);
  }


  public showDivs(n: number) {
    let i;
    let x = <HTMLElement[]><any>document.getElementsByClassName("mySlides");


    if (n > x.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = x.length }

    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "none";

    }
    x[this.slideIndex - 1].style.display = "block";
  }

  public joinResult(id: String) {
    console.log(id);

    this.getactivity.joinResult(id).subscribe(data => this.getJoinResult(data))
  }
  public voteResult(id: String) {
    this.getactivity.voteResult(id).subscribe(data => this.getVoteResult(data))
  }

  private joinResultScore
  getJoinResult(data) {
    this.joinResultScore = JSON.parse(data._body).result
    console.log(this.joinResultScore)
  }

  private voteResultScore
  getVoteResult(data) {
    this.voteResultScore = JSON.parse(data._body).result
  }


  getType(type: String) {
    if (type != 'total') {
      this.activities = this.activitiesTemp
      let temp = this.activitiesTemp
      this.activities = new Array()
      for (let i of temp) {
        if (type === i.type) {
          this.activities.push(i)

        }
      }

      console.log(this.activities)
    } else {
      this.activities = this.activitiesTemp
    }

  }

  search(name: String) {
    console.log(name)
    this.activities = this.activitiesTemp
    let temp = this.activitiesTemp
    this.activities = new Array()
    for (let i of temp) {
      if (name === "[") {

      }
      else if (i.name.toUpperCase().search(name.toUpperCase()) == -1) {
        console.log("-1")
      } else if (name === "") {
        this.activities = this.activitiesTemp
      } else {
        this.activities.push(i)
      }
    }

    console.log(this.activities)
  }



}
