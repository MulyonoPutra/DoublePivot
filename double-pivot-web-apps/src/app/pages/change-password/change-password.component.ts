import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ErrorService } from 'src/@core/services/error.service';
import { MessagesBoxService } from 'src/@core/services/messages-box.service';
import { ChangePasswordUseCase } from 'src/@core/usecase/change-password.usecase';
import { ChangePassword } from 'src/@core/domain/dto/payload/change-password';
import { ValidationService } from 'src/@core/services/validation.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  passwordForms!: UntypedFormGroup;
  isHidden: boolean = true;
  tokenPassword!: string;

  constructor(
    private fb: UntypedFormBuilder,
    private changePasswordUseCase: ChangePasswordUseCase,
    private errorService: ErrorService,
    private snackbar: MessagesBoxService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  /**
   * description: Initialize the forms
   */
  initForms() {
    this.passwordForms = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: ValidationService.confirmPasswordValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  /**
   * Change password value from FormGroup
   */
  get changePasswordValue(): ChangePassword {
    return {
      password: this.passwordForms.get('password')?.value,
      confirmPassword: this.passwordForms.get('confirmPassword')?.value,
      tokenPassword: this.activatedRoute.snapshot.params.tokenPassword
    };
  }

  get password() {
    return this.passwordForms.get('password');
  }

  get confirmPassword() {
    return this.passwordForms.get('confirmPassword');
  }


  /**
   * Submit the form to API
   */
  onChangePassword() {
    this.changePasswordUseCase.execute(this.changePasswordValue).subscribe({
      complete: () => {
        this.snackbar.success('Password changed!', 1700);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorService.getErrorMessage(error);
      },
    });
  }
}
