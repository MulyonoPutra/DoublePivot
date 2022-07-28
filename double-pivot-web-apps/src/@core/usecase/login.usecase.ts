import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../base/usecase';
import { Login } from '../domain/dto/payload/login';
import { LoginResponse } from '../domain/dto/response/login-response';
import { AuthRepository } from '../repository/service/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase implements UseCase<Login, LoginResponse> {

  constructor(protected authRepository: AuthRepository) {}

  execute(body: Login): Observable<LoginResponse> {
    return this.authRepository.login(body);
  }
  
}
