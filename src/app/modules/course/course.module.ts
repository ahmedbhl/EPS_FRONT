import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { CourseModalComponent } from './course-modal/course-modal.component';
import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course/course.component';
import { CourseService } from './services/course.service';

@NgModule({
    declarations: [CourseComponent, CourseModalComponent],
    imports: [CourseRoutingModule, SharedModuleModule],
    exports: [CourseComponent],
    providers: [CourseService],
    entryComponents: [CourseModalComponent]
})

export class CourseModule {
}
