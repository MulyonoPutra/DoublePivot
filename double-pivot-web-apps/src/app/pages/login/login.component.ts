import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Login } from 'src/@core/domain/dto/payload/login';
import { ErrorService } from 'src/@core/services/error.service';
import { MessagesBoxService } from 'src/@core/services/messages-box.service';
import { AuthService } from 'src/@core/services/auth.service';
import { LoginUseCase } from 'src/@core/usecase/login.usecase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForms!: UntypedFormGroup;

  isHidden:           boolean = true;
  isLoggedIn:         boolean = false;
  isLoggedInFailure:  boolean = false;
  roles: string[] = [];

  public subscription: Subscription[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private errorService: ErrorService,
    private snackbar: MessagesBoxService,
    private tokenService: AuthService,
    private loginUseCase: LoginUseCase
  ) { }


  ngOnInit(): void {
    this.initForms();

    /**
     * Check if token is exists.
     */
    if(this.tokenService.getToken()){
      this.isLoggedIn = true;
      this.isLoggedInFailure = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  /**
   * Initialize the forms
   */
  initForms() {
    this.loginForms = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', Validators.required],
    });
  }

  /**
   * Get login value from FormControl
   */
  get loginFormValues(): Login {
    return {
      username: this.loginForms.get('username')?.value,
      password: this.loginForms.get('password')?.value,
    };
  }

  get username() {
    return this.loginForms.get('username');
  }

  get password() {
    return this.loginForms.get('password');
  }

  /**
   * Submit Login value to API
   */
  login(): void {
    this.loginUseCase.execute(this.loginFormValues).subscribe(
      {
        next: (response) => {
          this.isLoggedIn = true;
          const authorities = response.authorities.map((authority) => {
            return authority.authority;
          })

          this.tokenService.setToken(response.token);
          this.tokenService.setUsername(response.username);
          this.tokenService.setAuthorities(authorities);
          this.tokenService.setAuthority(authorities.toString());

          this.roles = authorities;
          this.snackbar.success('Login successfully..', 700);
          setTimeout(() => {
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          }, 1100);


        },
        error: (error) => {
          this.isLoggedIn = false;
          this.isLoggedInFailure = true;
          this.errorService.getErrorMessage(error);
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.subscription && this.subscription.length > 0) {
      this.subscription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }

}
