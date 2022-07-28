import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipeModule } from 'src/@core/pipes/pipes.module';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';
import { MaterialModule } from 'src/@core/shared/material.module';

@NgModule({
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ControlMessagesModule,
    PipeModule,
    MaterialModule,
  ],
})
export class RegisterModule {}
