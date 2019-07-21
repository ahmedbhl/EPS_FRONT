import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { HomeActorsComponent } from './home-actors.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: HomeActorsComponent, canActivate: [NgxPermissionsGuard], data: {
          permissions: {
            only: ['SUPER_ADMIN', 'PROFESSOR', 'STUDENT'],
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'HomeActorsComponent app'
        }
      },
    ])],
  exports: [RouterModule]
})
export class HomeActorsRoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '404';
}

