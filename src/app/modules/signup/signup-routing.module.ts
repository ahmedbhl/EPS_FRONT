import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: SignupComponent, canActivate: [NgxPermissionsGuard], data: {
          permissions: {
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'SignupComponent app'
        }
      },
    ])],
  exports: [RouterModule]
})
export class SignupRoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '/error500';
}

