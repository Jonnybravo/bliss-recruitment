import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Question } from './../model/question';

const API = "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com";

@Injectable()
export class QuestionsService {

  constructor(private http: Http) { }

  /*
  * Fetches all the available questions
  */
  getQuestions(limit?, offset?, filter?): Observable<Question[]>{
    let data = this.createData(limit, offset, filter);

    console.log(this.createURL(API + '/questions', data))

    return this.http.get(this.createURL(API + '/questions', data))
        .map((res:Response)=> res.json());
  }

  /*
  * Joins the base url with the data object to form a valid url for accessing the data.
  */
  private createURL(url, data) {
    return [url, Object.keys(data).map(function(key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&")].join(data === {} ? "":"?");
  }

  /*
  * Creates the object with the necessary parameters to form the url for accessing the data.
  */
  private createData(limit?, offset?, filter?){

    let data = {};

    Object.assign(data, limit ? { limit: limit } : null,
      offset ? { offset: offset } : null,
      filter ? { filter: filter } : null
    );

    return data;
  }

}
