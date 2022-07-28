import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserParams} from "src/@core/domain/dto/params/user-params";
import {UpdateProfile} from "src/@core/domain/dto/payload/update-profile";
import { CurrentUserResponse } from "src/@core/domain/dto/response/current-user";
import {HttpResponseEntity} from "src/@core/domain/entity/http-response-entity";
import {User} from "src/@core/domain/entity/user";
import {environment} from "src/environments/environment";
import {UserRepository} from "../service/user.repository";

@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements UserRepository {

  constructor(private http: HttpClient) {
  }

  getCurrentUser(): Observable<CurrentUserResponse> {
    return this.http.get<CurrentUserResponse>(
      `${environment.endpoint}user/current-user`
    );
  }

  update(params: UserParams, body: UpdateProfile): Observable<HttpResponseEntity<User>> {
    return this.http.put<HttpResponseEntity<User>>(`${environment.endpoint}user/${params.id}`, body);
  }

}
