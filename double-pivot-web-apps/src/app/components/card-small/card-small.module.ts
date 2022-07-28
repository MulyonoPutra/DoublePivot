import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from 'src/@core/pipes/pipes.module';

import { CardSmallComponent } from './card-small.component';

@NgModule({
  imports: [
    CommonModule,
    PipeModule
  ],
  exports: [CardSmallComponent],
  declarations: [CardSmallComponent]
})

export class CardSmallModule { }
