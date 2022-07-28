import { NgModule } from '@angular/core';
import { PipeModule } from 'src/@core/pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { HorizontalLineModule } from '../horizontal-line/horizontal-line.module';
import { DetailPagesRoutingModule } from './detail-pages-routing.module';

import { DetailPagesComponent } from './detail-pages.component';


@NgModule({
  declarations: [
    DetailPagesComponent
  ],
  imports: [
    CommonModule,
    DetailPagesRoutingModule,
    HorizontalLineModule,
    PipeModule
  ]
})
export class DetailPagesModule { }
