import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
const IS_LOGGED_IN = 'IsLoggedIn';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token!: string | null;
  roles: Array<string> = [];
  private authority$ = new BehaviorSubject<string>('');

  constructor(private cookieService: CookieService) {}

  getAuthority(): Observable<string> {
    return this.authority$.asObservable();
  }

  setAuthority(role: string) {
    this.authority$.next(role);
  }

  public setToken(token: string): void {
    this.token = token;
    this.cookieService.delete(TOKEN_KEY);
    this.cookieService.set(TOKEN_KEY, token);
  }

  public getToken(): string {
    return this.cookieService.get(TOKEN_KEY);
  }

  public setUsername(userName: string): void {
    this.cookieService.delete(USERNAME_KEY);
    this.cookieService.set(USERNAME_KEY, userName);
  }

  public getUsername(): string {
    return this.cookieService.get(USERNAME_KEY);
  }

  public setAuthorities(authorities: string[]): void {
    this.cookieService.delete(AUTHORITIES_KEY);
    this.cookieService.set(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public loadToken(): string {
    return (this.token = this.cookieService.get(TOKEN_KEY));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (this.cookieService.get(AUTHORITIES_KEY)) {
      JSON.parse(this.cookieService.get(AUTHORITIES_KEY)).forEach(
        (authority: any) => {
          this.roles.push(authority.authority);
        }
      );
    }

    return this.roles;
  }

  public logout(): void {
    this.token = null;
    this.cookieService.deleteAll();
  }
}
