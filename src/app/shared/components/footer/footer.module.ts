import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { FooterComponent } from './footer.component';

@NgModule({
    declarations: [FooterComponent],
    imports: [
        RouterModule,
        SharedModuleModule,
    ],
    exports: [FooterComponent]
})
export class FooterModule {
}
