import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
@NgModule({
    declarations: [SignupComponent],
    imports: [SignupRoutingModule, SharedModuleModule],
    exports: [SignupComponent],
    // providers: [signupService]
})

export class SignupModule {
}
