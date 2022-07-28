import { Observable } from 'rxjs';
import { ChangePassword } from 'src/@core/domain/dto/payload/change-password';
import { Login } from 'src/@core/domain/dto/payload/login';
import { Register } from 'src/@core/domain/dto/payload/register';
import { SendEmail } from 'src/@core/domain/dto/payload/send-email';
import { LoginResponse } from 'src/@core/domain/dto/response/login-response';
import { HttpResponseEntity } from 'src/@core/domain/entity/http-response-entity';
import { User } from 'src/@core/domain/entity/user';

export abstract class AuthRepository {
  abstract login(body: Login): Observable<LoginResponse>;

  abstract register(body: Register): Observable<HttpResponseEntity<User>>;

  abstract adminRegister(body: Register): Observable<HttpResponseEntity<User>>;

  abstract sendEmail(body: SendEmail): Observable<any>;

  abstract changePassword(body: ChangePassword): Observable<any>;
}
