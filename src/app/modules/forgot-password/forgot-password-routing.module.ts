import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: ForgotPasswordComponent, canActivate: [NgxPermissionsGuard], data: {
          permissions: {
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'ForgotPasswordComponent app'
        }
      },
    ])],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '/error500';
}

