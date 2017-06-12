import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

@Injectable()
export class GetAcService {

  constructor(private http: Http) {

  }

  public getActivity(): Observable<any> {
    console.log("getActivity")
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });

    let options = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.http.get('http://localhost:3000/get_activities_all', options).map(data => data);
  }

  public checkAuth(): Observable<any> {
    console.log("checkAuth")
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });

    let options = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.http.get('http://localhost:3000/check_auth', options).map(data => data);
  }

  public join(id: String): Observable<any> {
    console.log("join")
    let data = {
      "id": id
    }
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/join_activity', body, options).map(data => data);
  }

  public vote(id: String, choice: number): Observable<any> {
    console.log("join")
    let data = {
      "id": id,
      "choice": choice
    }
    let body = JSON.stringify(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/vote_choice_activity', body, options).map(data => data);
  }



}
