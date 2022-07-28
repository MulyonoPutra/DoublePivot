import { NgModule } from '@angular/core';
import { CardModule } from 'src/app/components/card/card.module';
import { PipeModule } from 'src/@core/pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { CardLargeModule } from 'src/app/components/card-large/card-large.module';
import { CardSmallModule } from 'src/app/components/card-small/card-small.module';
import { HomeRoutingModule } from './home-routing.module';
import { HorizontalLineModule } from './../../components/horizontal-line/horizontal-line.module';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],

  imports: [
  CommonModule,
    HomeRoutingModule,
    HorizontalLineModule,
    CardModule,
    CardLargeModule,
    PipeModule,
    CardSmallModule
  ]
})
export class HomeModule { }
