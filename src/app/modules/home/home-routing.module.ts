import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: HomeComponent, canActivate: [NgxPermissionsGuard], data: {
          permissions: {
            only: ['SUPER_ADMIN', 'PROFESSOR', 'STUDENT'],
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'HomeComponent app'
        }
      },
    ])],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '404';
}

