import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: UserComponent, canActivate: [NgxPermissionsGuard], data: {
          permissions: {
            only: ['SUPER_ADMIN', 'ADMINISTRATION'],
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'UserComponent Component '
        }
      },
    ])],
  exports: [RouterModule]
})
export class UserRoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '/error500';
}

