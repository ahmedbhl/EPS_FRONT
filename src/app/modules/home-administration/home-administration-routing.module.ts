import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { HomeAdministrationComponent } from './home-administration.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: HomeAdministrationComponent, canActivate: [NgxPermissionsGuard], data: {
          permissions: {
            only: ['ADMINISTRATION'],
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'HomeAdministrationComponent app'
        }
      },
    ])],
  exports: [RouterModule]
})
export class HomeAdministrationRoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '';
}

