import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { LibraryComponent } from './library/library.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: LibraryComponent, canActivate: [NgxPermissionsGuard], data: {
          permissions: {
            only: ['ADMINISTRATION', 'PROFESSOR', 'STUDENT'],
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'LibraryComponent Component '
        }
      },
    ])],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '/error500';
}

