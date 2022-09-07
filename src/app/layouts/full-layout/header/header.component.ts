import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/app/auth/auth.service';
import { PROFILE_URL } from 'src/app/core/constants/paths';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { UserRole } from 'src/app/core/enums/user-role.enum';
import { Messages } from 'src/app/core/constants/messages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  profileUrl = PROFILE_URL;
  creditRequestPermissions = [UserRole.loadGenerator];

  constructor(
    public authService: AuthService,
    private router: Router,
    private dialogService: DialogService,
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
