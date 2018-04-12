import { Routes, RouterModule } from '@angular/router';
import { ListQuestionsComponent } from './list-questions/list-questions.component';

const appRoutes: Routes = [
    { path: 'questions', component: ListQuestionsComponent },
    { path: 'questions/:question_filter', component: ListQuestionsComponent },
    { path: '', redirectTo: '/questions', pathMatch: 'full' }
  ];

  export const appRoutingProviders: any[] = [];

  export const routing = RouterModule.forRoot(appRoutes);
