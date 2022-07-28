import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { SendEmail } from 'src/@core/domain/dto/payload/send-email';
import { ErrorService } from 'src/@core/services/error.service';
import { MessagesBoxService } from 'src/@core/services/messages-box.service';
import { SendEmailUseCase } from 'src/@core/usecase/send-mail.usecase';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnInit {
  emailForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private sendEmailUseCase: SendEmailUseCase,
    private errorService: ErrorService,
    private snackbar: MessagesBoxService
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.emailForm = this.fb.group({
      mailTo: [''],
    });
  }

  get mailToValue(): SendEmail {
    return {
      mailTo: this.emailForm.get('mailTo')?.value,
    };
  }

  /**
   * Send Email for Change Password
   */
  sendEmail() {
    console.log(this.mailToValue);

    this.sendEmailUseCase.execute(this.mailToValue).subscribe({
      complete: () => {
        this.snackbar.success('Email sent!', 700);
      },
      error: (error) => {
        this.errorService.getErrorMessage(error);
      },
    });
  }
}
