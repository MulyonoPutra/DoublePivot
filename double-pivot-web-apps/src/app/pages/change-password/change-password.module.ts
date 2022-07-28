import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipeModule } from 'src/@core/pipes/pipes.module';
import { MaterialModule } from 'src/@core/shared/material.module';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';

@NgModule({
  declarations: [ChangePasswordComponent],
  exports: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ControlMessagesModule,
    PipeModule,
    MaterialModule,
  ],
})
export class ChangePasswordModule {}
