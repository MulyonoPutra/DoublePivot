import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from './empty-state.component';

@NgModule({
  declarations: [EmptyStateComponent],
  exports: [EmptyStateComponent],
  imports: [CommonModule],
})
export class EmptyStateModule {}
