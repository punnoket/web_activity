import { Component, OnInit } from '@angular/core';
import { AddActivityService } from '../add_activity.service';


@Component({
  selector: 'app-add-act',
  templateUrl: './add-act.component.html',
  styleUrls: ['./add-act.component.css']
})
export class AddActComponent implements OnInit {
  private i = 0
  private arrChoice = new Array();
  private reader = new FileReader();
  private image
  constructor(private add_activity: AddActivityService) { }

  ngOnInit() {

  }




  add(name: String, type: String, loaccation: String, description: String, exprie: String, date: String, owner: String) {
    this.getChoice()
    let activity = {
      'name': name,
      'type': type,
      'location': location,
      'description': description,
      'image': this.image,
      'exprie': exprie,
      'date': date,
      'owner': owner,
      'choice': this.arrChoice
    }
    this.add_activity.addActivity(activity).subscribe(data => this.getData(data));
  }
  addp(a) {

    document.getElementById("test" + a).innerHTML = document.getElementById("test" + a).innerHTML + (
      ' <div class="col-lg-12" style="height: 10px; "></div> <div class="col-lg-12" ><input type="text" id="' + this.i + '" class="form-control""></div></div>'
    );
    this.i++

  }
  getChoice() {

    let input = (<HTMLInputElement>document.getElementById("aaaa")).value;
    this.arrChoice.push(input)
    for (let l = 0; l < this.i; l++) {
      let inputValue = (<HTMLInputElement>document.getElementById(l + "")).value;
      this.arrChoice.push(inputValue)
    }

  }
  readURL(file) {
    this.reader.onload = (file) => {

      this.image = this.reader.result
    }
    this.reader.readAsDataURL(file.target.files[0]);

  }

  private getData = function (value) {
    console.log(JSON.parse(value._body));

  }

  // test on/off
 




}
