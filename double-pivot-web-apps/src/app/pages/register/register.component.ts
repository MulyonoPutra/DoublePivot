import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Register } from 'src/@core/domain/dto/payload/register';
import { ErrorService } from 'src/@core/services/error.service';
import { MessagesBoxService } from 'src/@core/services/messages-box.service';
import { ValidationService } from 'src/@core/services/validation.service';
import { RegisterUseCase } from 'src/@core/usecase/register.usecase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForms!: UntypedFormGroup;
  public subscription: Subscription[] = [];
  isHidden: boolean = true;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private errorService: ErrorService,
    private snackbar: MessagesBoxService,
    private registerUseCase: RegisterUseCase
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  /**
   * Initialize FormGroup
   */
  initForms(): void {
    this.registerForms = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', Validators.required],
    });
  }

  /**
   * Get Register Form Value from FormGroup
   */
  get registerFormValue(): Register {
    return {
      name: this.registerForms.get('name')?.value,
      username: this.registerForms.get('username')?.value,
      email: this.registerForms.get('email')?.value,
      password: this.registerForms.get('password')?.value,
    };
  }

  /**
   * Submit Register Value to API
   */
  register(): void {
    this.subscription.push(
      this.registerUseCase.execute(this.registerFormValue).subscribe({
        next: (success) => {
          console.log(success);
        },
        error: (error) => {
          console.log(error);
          this.errorService.getErrorMessage(error);
        },
        complete: () => {
          this.snackbar.success('Register successfully..', 3000);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription && this.subscription.length > 0) {
      this.subscription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }
}
