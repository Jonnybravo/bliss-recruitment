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
  //public questionId: Number;

  constructor(private questionsService: QuestionsService, private route: ActivatedRoute, private router: Router,
    private utils: UtilsService, public dialog: MatDialog) {

    this.route.params.subscribe(params=>{
      const questionId = params['question_id'];


      this.questionsService.getQuestion(questionId).subscribe(
        response => {
          console.log(response)
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

  openDialog() {
    let dialogRef = this.dialog.open(QuestionsShareComponent, {
      data: { name: "HOLA", animal: "BATATA" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  vote(index){
    let votedQuestion = {};

    Object.assign(votedQuestion, this.question);

    votedQuestion['choices'].forEach((choice) => choice.votes = 0)
    votedQuestion['choices'][index].votes += 1;

    this.questionsService.vote(votedQuestion);
  }
}
