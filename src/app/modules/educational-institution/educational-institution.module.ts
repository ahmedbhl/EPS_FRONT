import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { EducationalInstitutionModalComponent } from './educational-institution-modal/educational-institution-modal.component';
import { EducationalInstitutionRoutingModule } from './educational-institution-routing.module';
import { EducationalInstitutionComponent } from './educational-institution.component';
import { EducationalInstitutionService } from './services/educational-institution.service';

@NgModule({
    declarations: [EducationalInstitutionComponent, EducationalInstitutionModalComponent],
    imports: [EducationalInstitutionRoutingModule, SharedModuleModule],
    exports: [EducationalInstitutionComponent],
    providers: [EducationalInstitutionService],
    entryComponents: [EducationalInstitutionModalComponent]
})

export class EducationalInstitutionModule {
}
