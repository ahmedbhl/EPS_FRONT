import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [HomeRoutingModule, SharedModuleModule],
    exports: [HomeComponent],
    // providers: [HomeService]
})

export class HomeModule {
}
