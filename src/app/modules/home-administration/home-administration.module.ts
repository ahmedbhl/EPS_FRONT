import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { HomeAdministrationRoutingModule } from './home-administration-routing.module';
import { HomeAdministrationComponent } from './home-administration.component';

@NgModule({
    declarations: [HomeAdministrationComponent],
    imports: [HomeAdministrationRoutingModule, SharedModuleModule],
    exports: [HomeAdministrationComponent],
    // providers: [HomeAdministrationService]
})

export class HomeAdministrationModule {
}
