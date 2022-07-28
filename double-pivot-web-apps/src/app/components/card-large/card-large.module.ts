import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from 'src/@core/pipes/pipes.module';
import { CardLargeComponent } from './card-large.component';

@NgModule({
  imports: [
    CommonModule,
    PipeModule
  ],
  exports: [CardLargeComponent],
  declarations: [CardLargeComponent]
})
export class CardLargeModule { }
