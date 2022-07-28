import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TriviaDetailsRoutingModule } from './trivia-details-routing.module';
import { TriviaDetailsComponent } from './trivia-details.component';


@NgModule({
  declarations: [
    TriviaDetailsComponent
  ],
  imports: [
    CommonModule,
    TriviaDetailsRoutingModule
  ]
})
export class TriviaDetailsModule { }
