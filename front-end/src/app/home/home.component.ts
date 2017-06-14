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


  private slideIndex = 0;




  constructor(private loginService: LoginService, private getactivity: GetAcService) {

    this.getactivity.getActivity().subscribe(data => this.getActivityData(data))
    this.getactivity.checkAuth().subscribe(data => this.getAuthData(data))


  }




  ngOnInit() {
    this.showDivs(this.slideIndex);
  }

  public test() {
    this.getactivity.checkAuth().subscribe(data => this.getAuthData(data))
  }


  private getActivityData = function(value) {
    console.log(JSON.parse(value._body));

    this.activities = JSON.parse(value._body).activity

  }

  private getAuthData = function(value) {

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


}
