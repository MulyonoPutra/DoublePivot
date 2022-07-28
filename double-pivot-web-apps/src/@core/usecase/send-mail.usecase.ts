import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../base/usecase';
import { SendEmail } from '../domain/dto/payload/send-email';
import { AuthRepository } from '../repository/service/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class SendEmailUseCase implements UseCase<SendEmail, any> {
  constructor(protected authRepository: AuthRepository) {}

  execute(body: SendEmail): Observable<any> {
    return this.authRepository.sendEmail(body);
  }
}
