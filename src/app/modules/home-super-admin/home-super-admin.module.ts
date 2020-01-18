import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { HomeSuperAdminRoutingModule } from './home-super-admin-routing.module';
import { HomeSuperAdminComponent } from './home-super-admin.component';

@NgModule({
    declarations: [HomeSuperAdminComponent],
    imports: [HomeSuperAdminRoutingModule, SharedModuleModule],
    exports: [HomeSuperAdminComponent],
    // providers: [MessengerSocketService]
})

export class HomeSuperAdminModule {
}
