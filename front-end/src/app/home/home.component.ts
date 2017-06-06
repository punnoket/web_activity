import { Component, OnInit } from '@angular/core';
import { GetAcService } from '../getactivity.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private getactivity: GetAcService) { 
    this.getactivity.getActivity().subscribe(data => this.getActivityData(data))
  }

  ngOnInit() {
  }

   private getActivityData = function(value) {
    console.log(JSON.parse(value._body));
   
  }

}
