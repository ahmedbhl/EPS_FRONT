import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { LevelModalComponent } from './level-modal/level-modal.component';
import { LevelRoutingModule } from './level-routing.module';
import { LevelComponent } from './level/level.component';
import { LevelService } from './services/level.service';

@NgModule({
    declarations: [LevelComponent, LevelModalComponent],
    imports: [LevelRoutingModule, SharedModuleModule],
    exports: [LevelComponent],
    providers: [LevelService],
    entryComponents: [LevelModalComponent]

})

export class LevelModule {
}
