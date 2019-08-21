import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { ClasseRoutingModule } from './classe-routing.module';
import { ClasseComponent } from './classe/classe.component';
import { ClasseService } from './services/classe.service';
import { ClasseModalComponent } from './classe-modal/classe-modal.component';

@NgModule({
    declarations: [ClasseComponent, ClasseModalComponent],
    imports: [ClasseRoutingModule, SharedModuleModule],
    exports: [ClasseComponent],
    providers: [ClasseService],
    entryComponents: [ClasseModalComponent]

})

export class ClasseModule {
}
