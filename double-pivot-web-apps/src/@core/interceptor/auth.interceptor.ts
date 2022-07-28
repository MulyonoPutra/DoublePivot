import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let req = request;
    const token = this.tokenService.getToken();
    if (token != null) {
      req = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      })
    }
    return next.handle(req);
  }
}
