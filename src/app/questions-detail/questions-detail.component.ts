import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UtilsService } from './../utils/utils';

import { QuestionsService } from './../services/questions.service';

import { Question } from './../model/question';

import { QuestionsShareComponent } from './../questions-share/questions-share.component';

@Component({
  selector: 'app-questions-detail',
  templateUrl: './questions-detail.component.html',
  styleUrls: ['./questions-detail.component.scss']
})
export class QuestionsDetailComponent implements OnInit {

  private question: Question;
  private hasVoted: Boolean;

  constructor(private questionsService: QuestionsService, private route: ActivatedRoute, private router: Router,
    private utils: UtilsService, public dialog: MatDialog) {

    this.route.params.subscribe(params=>{
      const questionId = params['question_id'];

      this.questionsService.getQuestion(questionId).subscribe(
        response => {
          this.question = response;
        }
      );
    });
  }

  ngOnInit() {

  }

  goToList(){
    this.router.navigate(['/questions']);
  }

  share() {
    this.dialog.open(QuestionsShareComponent);
  }

  vote(index){
    this.hasVoted = true;
    let votedQuestion = {};

    const votedChoices = this.question.choices.map((choice) => {
      return {'choice': choice.choice, 'votes': 0};
    });
    votedChoices[index].votes += 1;

    Object.assign(votedQuestion, this.question);
    votedQuestion['choices'] = votedChoices;

    this.questionsService.vote(votedQuestion).subscribe(
      response => {}
    );
  }
}
