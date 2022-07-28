import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../base/usecase';
import { Register } from '../domain/dto/payload/register';
import { HttpResponseEntity } from '../domain/entity/http-response-entity';
import { User } from '../domain/entity/user';
import { AuthRepository } from '../repository/service/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class AdminRegisterUseCase implements UseCase<Register, HttpResponseEntity<User>> {

  constructor(protected authRepository: AuthRepository) {}

  execute(body: Register): Observable<HttpResponseEntity<User>> {
    return this.authRepository.adminRegister(body);
  }

}
