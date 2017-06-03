import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: Http) {

    console.log("call login")
  }

  public login(): Observable<any> {
    console.log("login")
    let data = {
      "username": "punnoket",
      "password": "1234",
    }
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/login', body, options).map(data => data.json());
  }

}
