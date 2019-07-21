import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { HomeActorsRoutingModule } from './home-actors-routing.module';
import { HomeActorsComponent } from './home-actors.component';

@NgModule({
    declarations: [HomeActorsComponent],
    imports: [HomeActorsRoutingModule, SharedModuleModule],
    exports: [HomeActorsComponent],
    // providers: [HomeService]
})

export class HomeActorsModule {
}
