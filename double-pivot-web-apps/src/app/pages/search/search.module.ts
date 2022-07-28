import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'src/app/components/card/card.module';
import { PipeModule } from 'src/@core/pipes/pipes.module';
import { SearchComponent } from './search.component';
import { MaterialModule } from 'src/@core/shared/material.module';
import { CardLargeModule } from 'src/app/components/card-large/card-large.module';
import { SearchRoutingModule } from './search-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HorizontalLineModule } from 'src/app/components/horizontal-line/horizontal-line.module';
import { ArticlesRoutingModule } from '../articles/articles-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchComponent],
  exports: [SearchComponent],
  imports: [
    PipeModule,
    CardModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    CardLargeModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    NgxPaginationModule,
    HorizontalLineModule,
    ArticlesRoutingModule,
  ],
})
export class SearchModule {}
