import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { ValidationService } from 'src/@core/services/validation.service';

@Component({
  selector: 'control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent implements OnInit {

  @Input() control!: UntypedFormControl;

  constructor() { }

  ngOnInit() {
  }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
