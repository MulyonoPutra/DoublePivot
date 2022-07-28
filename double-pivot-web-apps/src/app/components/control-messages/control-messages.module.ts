import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from './control-messages.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ControlMessagesComponent],
  declarations: [ControlMessagesComponent]
})
export class ControlMessagesModule { }
