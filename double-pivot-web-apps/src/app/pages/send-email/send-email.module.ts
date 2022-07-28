import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendEmailRoutingModule } from './send-email-routing.module';
import { SendEmailComponent } from './send-email.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipeModule } from 'src/@core/pipes/pipes.module';
import { MaterialModule } from 'src/@core/shared/material.module';
import { ControlMessagesModule } from 'src/app/components/control-messages/control-messages.module';


@NgModule({
  declarations: [SendEmailComponent],
  exports: [SendEmailComponent],
  imports: [
    CommonModule,
    SendEmailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ControlMessagesModule,
    PipeModule,
    MaterialModule,
  ],
})
export class SendEmailModule {}
