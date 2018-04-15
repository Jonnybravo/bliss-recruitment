import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Question } from './../model/question';

import { ServerUtilsService } from './server-utils.service';

@Injectable()
export class QuestionsService {

  constructor(private http: Http, private serverUtils: ServerUtilsService) { }

  /*
  * Fetches all the available questions
  */
  getQuestions(limit?, offset?, filter?): Observable<Question[]>{
    let data = this.createData(limit, offset, filter);

    return this.http.get(this.serverUtils.createURL(`${this.serverUtils.API}/questions`, data))
        .map((res:Response)=> res.json());
  }

  /*
  * Fetches a specific question
  */
  getQuestion(questionId): Observable<Question>{
    let data = {'question_id': questionId};

    return this.http.get(`${this.serverUtils.API}/questions/${questionId}`)
        .map((res:Response)=> res.json());
  }

  /*
  * Votes for a choice on a question
  */
  vote(question): Observable<Question>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    console.log(`${this.serverUtils.API}/questions/${question.id}`)
    return this.http.put(`${this.serverUtils.API}/questions/${question.id}`, JSON.stringify(question), {headers: headers})
        .map((res:Response)=> res.json())
        .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? (error.status) : 'Server error';

    console.error(errMsg); // log to console instead

    return Observable.throw(errMsg);
  }

  /*
  * Creates the object with the necessary parameters to form the url for accessing the data.
  */
  private createData(limit?, offset?, filter?){

    let data = {};

    Object.assign(data,
      limit ? { limit: limit } : null,
      offset ? { offset: offset } : null,
      filter ? { filter: filter } : null
    );

    return data;
  }

}
