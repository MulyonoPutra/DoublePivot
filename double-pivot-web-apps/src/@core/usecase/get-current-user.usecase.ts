import { Injectable } from "@angular/core";
import { UseCase } from "../base/usecase";
import { Observable } from "rxjs";
import { CurrentUserResponse } from "../domain/dto/response/current-user";
import { UserRepository } from "../repository/service/user.repository";

@Injectable({
  providedIn: 'root'
})

export class GetCurrentUserUseCase implements UseCase<null, CurrentUserResponse> {

  constructor(protected userRepository: UserRepository){}

  execute(): Observable<CurrentUserResponse> {
    return this.userRepository.getCurrentUser();
  }

}
