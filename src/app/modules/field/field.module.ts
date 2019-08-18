import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { FieldModalComponent } from './field-modal/field-modal.component';
import { FieldRoutingModule } from './field-routing.module';
import { FieldComponent } from './field/field.component';
import { FieldService } from './services/field.service';

@NgModule({
    declarations: [FieldComponent, FieldModalComponent],
    imports: [FieldRoutingModule, SharedModuleModule],
    exports: [FieldComponent],
    providers: [FieldService],
    entryComponents: [FieldModalComponent]

})

export class FieldModule {
}
