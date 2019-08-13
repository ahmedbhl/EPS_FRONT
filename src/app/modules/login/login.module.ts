import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [LoginRoutingModule, SharedModuleModule],
    exports: [LoginComponent],
    // providers: [HomeActorsService]
})

export class LoginModule {
}
