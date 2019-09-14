import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { GroupModalComponent } from './group-modal/group-modal.component';
import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group/group.component';
import { GroupService } from './services/group.service';

@NgModule({
    declarations: [GroupComponent, GroupModalComponent],
    imports: [GroupRoutingModule, SharedModuleModule],
    exports: [GroupComponent],
    providers: [GroupService],
    entryComponents: [GroupModalComponent]

})

export class GroupModule {
}
