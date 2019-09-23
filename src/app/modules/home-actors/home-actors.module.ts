import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { HomeActorsModalComponent } from './home-actors-modal/home-actors-modal.component';
import { HomeActorsRoutingModule } from './home-actors-routing.module';
import { HomeActorsComponent } from './home-actors.component';

@NgModule({
    declarations: [HomeActorsComponent, HomeActorsModalComponent],
    imports: [HomeActorsRoutingModule, SharedModuleModule],
    exports: [HomeActorsComponent],
    entryComponents: [HomeActorsModalComponent]
})

export class HomeActorsModule {
}
