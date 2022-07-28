import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  existingRole!: string;

  constructor(private tokenService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.tokenService.getAuthorities();
    if (currentUser) {
      if (route.data.roles && route.data.roles.indexOf(currentUser) === -1) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;

    //   const expectedRole = route.data['expectedRole'];
    //   const role = this.tokenService.getAuthorities();
    //   this.existingRole = 'user';
    //   role.forEach(element => {
    //     if (element === 'ROLE_ADMIN') {
    //       this.existingRole = 'admin';
    //     }
    //   });

    //   if (!this.tokenService.getToken() || expectedRole.indexOf(this.existingRole) === -1) {
    //     this.router.navigate(['/login']);
    //     return false;
    //   }
    //   return true;
    // }
  }
}
