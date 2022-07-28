import { CurrentUserResponse } from './../../domain/dto/response/current-user';
import {Observable} from 'rxjs';
import {UserParams} from 'src/@core/domain/dto/params/user-params';
import {UpdateProfile} from 'src/@core/domain/dto/payload/update-profile';
import {HttpResponseEntity} from 'src/@core/domain/entity/http-response-entity';
import {User} from 'src/@core/domain/entity/user';

export abstract class UserRepository {
  abstract update(params: UserParams, body: UpdateProfile): Observable<HttpResponseEntity<User>>;
  abstract getCurrentUser(): Observable<CurrentUserResponse>;
}
