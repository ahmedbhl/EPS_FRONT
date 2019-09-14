import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { GroupComponent } from './group/group.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: GroupComponent, canActivate: [NgxPermissionsGuard], data: {
          rmissions: {
            only: ['ADMINISTRATION', 'SUPER_ADMIN'],
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'Group Component '
        }
      },
    ])],
  exports: [RouterModule]
})
export class GroupRoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '/error500';
}

