import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  @Input() set role(hideForRoles: Array<string>) {
    const hideFor = hideForRoles || [];
    if (hideFor.length > 0) {
      this.roleChecker(hideFor);
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  roleChecker(hideFor: Array<string>) {
    // Current User Roles
    const userRoles: Array<string> = ['ROLE_ADMIN', 'ROLE_USER'];
    
    if (userRoles.length === 0) {
      this.viewContainerRef.clear();
    } else {
      const index = userRoles.findIndex(role => hideFor.indexOf(role) !== -1);
      return index === -1 ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear();
    }
  }

}
