import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { Error500Component } from './error500.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: Error500Component, canActivate: [NgxPermissionsGuard], data: {
          permissions: {
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'Error500Component app'
        }
      },
    ])],
  exports: [RouterModule]
})
export class Error500RoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '/home';
}

