import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { LevelRoutingModule } from './level-routing.module';
import { LevelComponent } from './level/level.component';
import { LevelService } from './services/level.service';

@NgModule({
    declarations: [LevelComponent],
    imports: [LevelRoutingModule, SharedModuleModule],
    exports: [LevelComponent],
    providers: [LevelService],
})

export class LevelModule {
}
