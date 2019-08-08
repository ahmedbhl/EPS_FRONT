import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { HomeSuperAdminComponent } from './home-super-admin.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: HomeSuperAdminComponent, canActivate: [NgxPermissionsGuard], data: {
          permissions: {
            only: ['SUPER_ADMIN'],
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'HomeSuperAdminComponent app'
        }
      },
    ])],
  exports: [RouterModule]
})
export class HomeSuperAdminRoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '/error500';
}

