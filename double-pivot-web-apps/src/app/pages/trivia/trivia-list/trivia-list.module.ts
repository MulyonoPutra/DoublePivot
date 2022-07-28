import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardModule} from 'src/app/components/card/card.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {TriviaListRoutingModule} from './trivia-list-routing.module';

import {TriviaListComponent} from './trivia-list.component';
import {EmptyStateModule} from 'src/app/components/empty-state/empty-state.module';

@NgModule({
  declarations: [
    TriviaListComponent
  ],
  exports: [
    TriviaListComponent
  ],
  imports: [
    CommonModule,
    TriviaListRoutingModule,
    CardModule,
    NgxPaginationModule,
    EmptyStateModule
  ]
})
export class TriviaListModule {
}
