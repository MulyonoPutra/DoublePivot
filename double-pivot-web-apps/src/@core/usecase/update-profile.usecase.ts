import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithRequestBody } from '../base/usecase';
import { UserParams } from '../domain/dto/params/user-params';
import { UpdateProfile } from '../domain/dto/payload/update-profile';
import { HttpResponseEntity } from '../domain/entity/http-response-entity';
import { User } from '../domain/entity/user';
import { UserRepository } from '../repository/service/user.repository';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfileUseCase implements UseCaseWithRequestBody<UserParams, UpdateProfile, HttpResponseEntity<User>> {
  constructor(protected userRepository: UserRepository) { }

  execute(params: UserParams, body: UpdateProfile): Observable<HttpResponseEntity<User>> {
    return this.userRepository.update(params, body);
  }
}
