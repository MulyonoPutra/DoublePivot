import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../base/usecase';
import { ChangePassword } from '../domain/dto/payload/change-password';
import { AuthRepository } from '../repository/service/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordUseCase implements UseCase<ChangePassword, any> {
  constructor(protected authRepository: AuthRepository) {}

  execute(body: ChangePassword): Observable<any> {
    return this.authRepository.changePassword(body);
  }
}
