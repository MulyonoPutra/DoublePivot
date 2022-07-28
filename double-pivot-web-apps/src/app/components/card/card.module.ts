import { NgModule } from '@angular/core';
import { PipeModule } from 'src/@core/pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';

@NgModule({
  imports: [
    CommonModule,
    PipeModule
  ],
  exports: [CardComponent],
  declarations: [CardComponent]
})
export class CardModule { }
