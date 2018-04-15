import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Question } from './../model/question';

import { ServerUtilsService } from './server-utils.service';

// const API = "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com";

@Injectable()
export class QuestionsService {

  constructor(private http: Http, private serverUtils: ServerUtilsService) { }

  /*
  * Fetches all the available questions
  */
  getQuestions(limit?, offset?, filter?): Observable<Question[]>{
    let data = this.createData(limit, offset, filter);

    console.log(this.serverUtils.createURL(this.serverUtils.API + '/questions', data))

    return this.http.get(this.serverUtils.createURL(`${this.serverUtils.API}/questions`, data))
        .map((res:Response)=> res.json());
  }

  /*
  * Fetches a specific question
  */
  getQuestion(questionId): Observable<Question>{
    let data = {'question_id': questionId};

    console.log(`${this.serverUtils.API}/questions/${questionId}`)

    return this.http.get(`${this.serverUtils.API}/questions/${questionId}`)
        .map((res:Response)=> res.json());
  }

  /*
  * Votes for a choice on a question
  */
  vote(question): Observable<Question>{
    //let data = {'question_id': questionId};

    console.log(JSON.stringify(question))

    return this.http.put(`${this.serverUtils.API}/questions/${question.questionId}`, JSON.stringify(question))
        .map((res:Response)=> res.json());
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
