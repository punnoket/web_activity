import { Component, OnInit } from '@angular/core';
import { GetAcService } from '../getactivity.service';



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
  private choices
  private keyJoin
  private keyVote
  private checkJoin = true
  private idJoin
  private idVote
  private indexOfChoice
  private checkAuth
  constructor(private loginService: LoginService, private getactivity: GetAcService) {
    this.getactivity.getActivity().subscribe(data => this.getActivityData(data))
    this.getactivity.checkAuth().subscribe(data => this.getAuthData(data))
    this.showDivs(this.slideIndex)



  }


  ngOnInit() {
  }

  public test() {
    this.getactivity.checkAuth().subscribe(data => this.getAuthData(data))
  }


  private getActivityData = function (value) {
    console.log(JSON.parse(value._body));

    this.activities = JSON.parse(value._body).activity

  }

  private getAuthData = function (value) {

    this.checkAuth = JSON.parse(value._body).success
    console.log(this.checkAuth)

  }

  public getChoices(id: String) {
    this.idVote = id
    for (let i of this.activities) {
      if (id === i._id) {
        this.choices = i.choice
        this.keyVote = i.key
        console.log(i.key)
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
      console.log("join !!!")
      this.getactivity.join(this.idJoin).subscribe(data => this.getData(data))
    } else {

      alert("wrong key !!!")
    }
  }

  public checkMatchKeyVote(key: String) {
    console.log(key + " " + this.keyVote)
    if (this.keyVote === key) {

      console.log("vote !!!")
      this.getactivity.vote(this.idVote, this.indexOfChoice).subscribe(data => this.getData(data))
    } else {

      alert("wrong key !!!")
    }

  }

  private getData = function (value) {
    console.log(JSON.parse(value._body));

  }

  public onSelectionChange(index: number) {
    this.indexOfChoice = index
  }


private slideIndex = 1;


public plusDivs(n: number) {
  this.showDivs(this.slideIndex += n);
}

private showDivs(n: number) {
  let i;
  let x: NodeListOf<Element> = document.getElementsByClassName("mySlides");


  
  // if (n > x.length) { this.slideIndex = 1 }
  // if (n < 1) { this.slideIndex = x.length }
  // for (i = 0; i < x.length; i++) {
  //   x[i].style.display = "none";
  // }
  // x[this.slideIndex - 1].style.display = "block";
}




}

