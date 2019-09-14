import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { MessengerComponent } from './messenger.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: MessengerComponent, canActivate: [NgxPermissionsGuard], data: {
          permissions: {
            only: ['SUPER_ADMIN', 'ADMINISTRATION', 'PROFESSOR', 'STUDENT'],
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'MessengerComponent app'
        }
      },
    ])],
  exports: [RouterModule]
})
export class MessengerRoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '/error500';
}

