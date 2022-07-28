import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ChangePassword} from "src/@core/domain/dto/payload/change-password";
import {Login} from "src/@core/domain/dto/payload/login";
import {Register} from "src/@core/domain/dto/payload/register";
import {SendEmail} from "src/@core/domain/dto/payload/send-email";
import {LoginResponse} from "src/@core/domain/dto/response/login-response";
import {HttpResponseEntity} from "src/@core/domain/entity/http-response-entity";
import {User} from "src/@core/domain/entity/user";
import {environment} from "src/environments/environment";
import {AuthRepository} from "../service/auth.repository";

@Injectable({
  providedIn: 'root'
})
export class AuthAdapter implements AuthRepository {

  endpoint: string = environment.endpoint;

  constructor(private http: HttpClient) {
  }

  login(body: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.endpoint}auth/login`, body);
  }

  register(body: Register): Observable<HttpResponseEntity<User>> {
    return this.http.post<HttpResponseEntity<User>>(`${this.endpoint}auth/register`, body);
  }

  adminRegister(body: Register): Observable<HttpResponseEntity<User>> {
    return this.http.post<HttpResponseEntity<User>>(`${this.endpoint}auth/admin-register`, body);
  }

  sendEmail(body: SendEmail): Observable<any> {
    return this.http.post<any>(`${this.endpoint}auth/send-email`, body);
  }

  changePassword(body: ChangePassword): Observable<any> {
    return this.http.post<any>(`${this.endpoint}auth/change-password`, body);
  }

}
