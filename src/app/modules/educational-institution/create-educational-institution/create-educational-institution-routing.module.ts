import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { Helper } from 'app/core/helper.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CreateEducationalInstitutionComponent } from './create-educational-institution.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: CreateEducationalInstitutionComponent, canActivate: [NgxPermissionsGuard], data: {
          permissions: {
            only: ['ADMINISTRATION', 'SUPER_ADMIN'],
            redirectTo: userAddRedirectTo
          },
          breadcrumb: 'Create Educational Institution Component'
        }
      },
    ])],
  exports: [RouterModule]
})
export class CreateEducationalInstitutionRoutingModule { }

/**
 * User redirection if access to user adding screen is not allowed
 */
export function userAddRedirectTo() {
  console.log('Access Denied - insufficient rights for this function');
  // Helper.broadcast('Access Denied - insufficient rights for this function');
  return '/error500';
}

