import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { GlobalConstant as Constant } from '../constants/global-constant';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config: any = {
      required: 'Required',
      minimumContentLength: 'Content must be at least 100 characters',
      minlength: `Minimum length ${validatorValue.requiredLength} characters`,
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      confirmPasswordValidator: `Passsword and Confirm Password didn't match.`,
      invalidEmailAddress: 'Invalid email address',
    };

    return config[validatorName];
  }

  static contentValidator(control: any) {
    if (control.value < 100) {
      return null;
    } else {
      return { minimumContentLength: true };
    }
  }

  static emailValidator(control: any) {
    // RFC 2822 compliant regex
    if (control.value.match(Constant.EMAIL_REGEX)) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static passwordValidator(control: any) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(Constant.PASSWORD_REGEX)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }



  static confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmPasswordValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
