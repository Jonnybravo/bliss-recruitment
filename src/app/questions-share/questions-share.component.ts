import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ServerUtilsService } from './../services/server-utils.service';

@Component({
  selector: 'app-questions-share',
  templateUrl: './questions-share.component.html',
  styleUrls: ['./questions-share.component.scss']
})
export class QuestionsShareComponent {

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    public dialogRef: MatDialogRef<QuestionsShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private serviceUtils: ServerUtilsService,
    private router: Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /*
  * Validates if the inserted email is valid
  */
  getErrorMessage() {
    const message = this.email.hasError('required') ? 'You must enter an email' :
        this.email.hasError('email') ? 'Not a valid email' : '';

    return message;
  }

  /*
  * Calls the service to share a page and closes the dialog
  */
  sharePage(){
    this.serviceUtils.sharePage(this.email.value, window.location.href);
    this.dialogRef.close();
  }
}
