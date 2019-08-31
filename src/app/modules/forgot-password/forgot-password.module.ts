import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [ForgotPasswordRoutingModule, SharedModuleModule],
    exports: [ForgotPasswordComponent],
    // providers: [ForgotPasswordService]
})

export class ForgotPasswordModule {
}
