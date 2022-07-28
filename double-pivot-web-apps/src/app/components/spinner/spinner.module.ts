import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { MaterialModule } from 'src/@core/shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [SpinnerComponent],
  declarations: [SpinnerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpinnerModule { }
