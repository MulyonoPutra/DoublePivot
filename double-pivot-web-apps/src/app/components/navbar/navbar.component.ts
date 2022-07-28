import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/@core/services/auth.service';
import { GetCurrentUserUseCase } from 'src/@core/usecase/get-current-user.usecase';
import { NavbarProfile } from 'src/@core/utility/interface/navbar-profile';


export const Roles = {
  user: 'ROLE_USER',
  admin: 'ROLE_ADMIN'
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public defaultLogo: string = 'https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg';

  public isLoggedIn:  boolean = false;
  public isMenu:      boolean = false;
  public isAdmin:     boolean = false;
  public isSticky:    boolean = false;

  public profiles!:   NavbarProfile;

  public userRoles = Roles;

  isList: number = 0;

  constructor(
    private router: Router,
    private tokenService: AuthService,
    private currentUserUseCase: GetCurrentUserUseCase
  ) {}

  ngOnInit() {
    this.onCheckLoggedIn();
    this.onCheckAuthority();
    this.getCurrentUserInfo();
  }

  onCheckLoggedIn(): void {
    if (this.tokenService.loadToken()) {
      this.isAdmin = true;
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  onCheckAuthority() {
    this.isAdmin = true;
    this.tokenService.getAuthority().subscribe((role) => {
      if (role.includes('ROLE_ADMIN')) {
        this.isAdmin = false;
        localStorage.setItem('isAdmin', JSON.stringify(!this.isAdmin));
      } else if (role.includes('ROLE_USER')) {
        localStorage.removeItem('isAdmin');
      }
    });
  }

  getCurrentUserInfo() {
    if (this.tokenService.loadToken()) {
      this.currentUserUseCase.execute().subscribe((user) => {
        this.profiles = {
          name: user.name,
          profilePicture: user.profilePicture,
        };
      });
    }
  }

  logout() {
    this.tokenService.logout();
    setTimeout(() => {
      window.location.reload();
      this.router.navigate(['/login']);
    }, 500);
  }

  navigate(route: string) {
    switch (route) {
      case 'login':
        this.router.navigate(['/login']);
        break;

      case 'register':
        this.router.navigate(['/register']);
        break;

      case 'post':
        this.router.navigate(['/post']);
        break;

      case 'profile':
        this.router.navigate(['/profile']);
        break;
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 50;
  }
}
