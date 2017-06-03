import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: Http) {

  }

  public login(username: String, password: String): Observable<any> {
    console.log("login")
    let data = {
      "username": username,
      "password": password,
    }
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/login', body, options).map(data => data);
  }

  public loginFacebook(): Observable<any> {
    console.log("login facebook")
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });

    headers.append('Authorization', 'Bearer ')
    let options = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.http.get('http://localhost:3000/auth/facebook', options).map(data => data);
  }



}
