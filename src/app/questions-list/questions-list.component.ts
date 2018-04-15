import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { UtilsService } from './../utils/utils';

import { QuestionsService } from './../services/questions.service';

import { Question } from './../model/question';

import { QuestionsDetailComponent } from './../questions-detail/questions-detail.component';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  private questions: Question[] = [];
  private numQuestions: number = 10;
  private offset: number = 0;
  private filter: Observable<string>;

  private noMoreRecords: Boolean;

  constructor(private questionsService: QuestionsService, private route: ActivatedRoute, private router: Router, private utils: UtilsService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filter = params['question_filter'];

      const questionId = params['question_id'];

      if(questionId)
        return this.goToQuestion(questionId);

      this.listQuestions(this.numQuestions, this.offset, this.filter);
    });
  }

  listQuestions(questionsNumber?, questionsOffset?, questionsFilter?){
    this.questionsService.getQuestions(questionsNumber, questionsOffset, questionsFilter).subscribe(
      response => {
        this.questions.push(...response);

        if(response.length < this.numQuestions)
          this.noMoreRecords = true;
      }
    )
  }

  search(){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.route.snapshot.queryParams,
        question_filter: this.filter,
      }
    });

    this.listQuestions(this.numQuestions, this.offset, this.filter);
  }

  goToQuestion(questionId){
    this.router.navigate(['/questions', questionId]);
  }

  loadMore(){
    this.listQuestions(this.numQuestions, this.offset + this.numQuestions, this.filter);
  }
}
