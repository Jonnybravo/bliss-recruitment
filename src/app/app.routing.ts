import { Routes, RouterModule } from '@angular/router';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsDetailComponent } from './questions-detail/questions-detail.component';

const appRoutes: Routes = [
    { path: 'questions', component: QuestionsListComponent },
    { path: 'questions/:question_id', component: QuestionsDetailComponent },
    { path: '', redirectTo: '/questions', pathMatch: 'full' }
  ];

  export const appRoutingProviders: any[] = [];

  export const routing = RouterModule.forRoot(appRoutes);
