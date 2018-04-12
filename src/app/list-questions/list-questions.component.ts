import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { QuestionsService } from './../services/questions.service';

import { Question } from './../model/question';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss']
})
export class ListQuestionsComponent implements OnInit {

  private questions: Question[];
  private numQuestions: number = 10;
  private offset: number = 10;
  private filter: Observable<string>;

  constructor(private questionsService: QuestionsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filter = params['question_filter'];

      this.listQuestions(this.numQuestions, this.offset, this.filter);
    });
  }

  listQuestions(questionsNumber?, questionsOffset?, questionsFilter?){
    this.questionsService.getQuestions(questionsNumber, questionsOffset, questionsFilter).subscribe(
      response => {
        this.questions = response;
        console.log(response);
      }

    )
  }

  search(){
    console.log("FILTER: " + this.filter)
    this.listQuestions(this.numQuestions, this.offset, this.filter);
  }

  getFormattedDate(date){
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let d = new Date(date);

    return d.toLocaleDateString('en-EN', options);
  }

}
