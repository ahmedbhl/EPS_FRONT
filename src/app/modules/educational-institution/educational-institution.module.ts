import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { EducationalInstitutionRoutingModule } from './educational-institution-routing.module';
import { EducationalInstitutionComponent } from './educational-institution.component';
import { EducationalInstitutionService } from './services/educational-institution.service';

@NgModule({
    declarations: [EducationalInstitutionComponent],
    imports: [EducationalInstitutionRoutingModule, SharedModuleModule],
    exports: [EducationalInstitutionComponent],
    providers: [EducationalInstitutionService]
})

export class EducationalInstitutionModule {
}
