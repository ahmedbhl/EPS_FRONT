import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: LoginComponent, canActivate: [NgxPermissionsGuard], data: {
          permissions: {
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'LoginComponent app'
        }
      },
    ])],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '/error500';
}

