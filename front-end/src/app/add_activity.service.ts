import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

@Injectable()
export class AddActivityService {

  constructor(private http: Http) {

  }

  public addActivity(activity: Object): Observable<any> {
    console.log("add activity")

    let body = JSON.stringify(activity);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/add_activity', body, options).map(data => data);
  }



}
