import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'src/app/components/card/card.module';
import { PipeModule } from 'src/@core/pipes/pipes.module';
import { CardLargeModule } from 'src/app/components/card-large/card-large.module';
import { SearchBarModule } from 'src/app/components/search-bar/search-bar.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HorizontalLineModule } from 'src/app/components/horizontal-line/horizontal-line.module';
import { ArticlesRoutingModule } from './articles-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArticlesComponent } from './articles.component';
import {EmptyStateModule} from "../../components/empty-state/empty-state.module";

@NgModule({
  declarations: [
    ArticlesComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    ArticlesRoutingModule,
    HorizontalLineModule,
    CardModule,
    CardLargeModule,
    PipeModule,
    SearchBarModule,
    FormsModule,
    ReactiveFormsModule,
    EmptyStateModule,
  ],
  exports: [NgxPaginationModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArticlesModule { }
