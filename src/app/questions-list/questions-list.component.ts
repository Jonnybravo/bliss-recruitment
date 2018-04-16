import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UtilsService } from './../utils/utils';

import { QuestionsService } from './../services/questions.service';

import { Question } from './../model/question';

import { QuestionsDetailComponent } from './../questions-detail/questions-detail.component';
import { QuestionsShareComponent } from './../questions-share/questions-share.component';

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

  constructor(private questionsService: QuestionsService, private route: ActivatedRoute, private router: Router,
    private utils: UtilsService, public dialog: MatDialog) {}

  /*
  * Verifies the query string parameters and decides to navigate to a specific question page or to fetch a filtered list
  */
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filter = params['question_filter'];

      const questionId = params['question_id'];

      if(questionId)
        return this.goToQuestion(questionId);

      this.listQuestions(this.numQuestions, this.offset, this.filter);
    });
  }

  /*
  * Calls the service to fetch the questions
  */
  listQuestions(questionsNumber?, questionsOffset?, questionsFilter?){
    this.questionsService.getQuestions(questionsNumber, questionsOffset, questionsFilter).subscribe(
      response => {
        this.questions.push(...response);

        if(response.length < this.numQuestions)
          this.noMoreRecords = true;
      }
    )
  }

  /*
  * Updates the URL and calls listQuestions
  */
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

  /*
  * Navigates to a specific question
  */
  goToQuestion(questionId){
    this.router.navigate(['/questions', questionId]);
  }

  /*
  * Loads more questions
  */
  loadMore(){
    this.offset += this.numQuestions;
    this.listQuestions(this.numQuestions, this.offset, this.filter);
  }

  /*
  * Opens the dialog box provided by the QuestionsShareComponent
  */
  share(){
    this.dialog.open(QuestionsShareComponent);
  }
}
