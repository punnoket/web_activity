import { Component } from '@angular/core';
import {LoginService} from './login.service';
import { Subscription } from 'rxjs/Subscription';
import { GetAcService } from './getactivity.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  private objectData: any
  private check = false
  private username = ""
  public user
  userParse = "this.user"

  constructor(private loginService: LoginService, private getactivity: GetAcService) {
    this.getactivity.checkAuth().subscribe(data => this.getAuthData(data))

  }
  private getAuthData = function(value) {

    this.check = JSON.parse(value._body).success
    this.username = JSON.parse(value._body).username
    console.log(this.check)

  }

  login(username: String, password: String) {
    console.log(username)
    this.loginService.login(username, password).subscribe(data => this.getUserData(data));
  }

  private getUserData = function(value) {
    console.log(JSON.parse(value._body));
    let data = JSON.parse(value._body)
    this.loginService.setUser(data.user[0])
    this.user = data.user[0]
    window.location.href = '/'


  }



  logout() {
    this.loginService.setUser(null)
    this.loginService.logout().subscribe(data => this.getData(data));
  }

  private getData = function(value) {
    window.location.href = '/'

  }
  register(username: String, password: String, name: String, fac: String, id: String) {
    let user = {
      'name': name,
      'student_id': id,
      'password': password,
      'username': username,
      'faculty': fac
    }
    console.log(user)
    this.loginService.register(user).subscribe(data => this.getData(data));
  }
}
