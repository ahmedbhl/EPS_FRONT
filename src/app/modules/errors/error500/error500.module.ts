import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { Error500RoutingModule } from './error500-routing.module';
import { Error500Component } from './error500.component';

@NgModule({
    declarations: [Error500Component],
    imports: [Error500RoutingModule, SharedModuleModule],
    exports: [Error500Component],
})

export class Error500Module {
}
