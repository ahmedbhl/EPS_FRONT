import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { UserService } from 'src/app/core/authentication/user.service';
@NgModule({
    declarations: [SignupComponent],
    imports: [SignupRoutingModule, SharedModuleModule],
    exports: [SignupComponent],
    providers: [UserService]
})

export class SignupModule {
}
