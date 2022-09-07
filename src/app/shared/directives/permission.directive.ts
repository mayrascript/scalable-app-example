import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { UserRole } from 'src/app/core/enums/user-role.enum';
import { AuthStorageService } from 'src/app/core/services/app/storage/auth-storage.service';

@Directive({
  selector: '[appPermission]',
})
export class PermissionDirective {
  constructor(
    private authStorageService: AuthStorageService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  @Input()
  set appPermission(permissions: UserRole[] | undefined) {
    const user = this.authStorageService.user;
    if (!user) {
      return;
    }

    if (!permissions) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    this.updateViewContainer(permissions, user.role);
  }

  private updateViewContainer(roles: UserRole[], userRole: UserRole | undefined) {
    if (roles.some(role => role === userRole)) {
      return this.viewContainer.createEmbeddedView(this.templateRef);
    }

    this.viewContainer.clear();

    return;
  }
}
