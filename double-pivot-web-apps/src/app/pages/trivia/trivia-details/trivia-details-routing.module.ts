import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriviaDetailsComponent } from './trivia-details.component';

const routes: Routes = [{ path: '', component: TriviaDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TriviaDetailsRoutingModule { }
