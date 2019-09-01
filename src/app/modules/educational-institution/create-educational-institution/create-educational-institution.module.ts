import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { EducationalInstitutionService } from '../services/educational-institution.service';
import { CreateEducationalInstitutionRoutingModule } from './create-educational-institution-routing.module';
import { CreateEducationalInstitutionComponent } from './create-educational-institution.component';

@NgModule({
    declarations: [CreateEducationalInstitutionComponent],
    imports: [CreateEducationalInstitutionRoutingModule, SharedModuleModule],
    exports: [CreateEducationalInstitutionComponent],
    providers: [EducationalInstitutionService],
})

export class CreateEducationalInstitutionModule {
}
