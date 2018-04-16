import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Angular material components and animations
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsDetailComponent } from './questions-detail/questions-detail.component';
import { QuestionsShareComponent } from './questions-share/questions-share.component';

import { QuestionsService } from './services/questions.service';
import { ServerUtilsService } from './services/server-utils.service';
import { UtilsService } from './utils/utils';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsListComponent,
    QuestionsDetailComponent,
    QuestionsShareComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents:[
    QuestionsShareComponent
  ],
  providers: [QuestionsService, ServerUtilsService, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
