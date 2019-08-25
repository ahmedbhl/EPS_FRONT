import { NgModule } from '@angular/core';
import { UserService } from 'src/app/core/authentication/user.service';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { UserModalComponent } from './user-modal/user-modal.component';

@NgModule({
    declarations: [UserComponent, UserModalComponent],
    imports: [UserRoutingModule, SharedModuleModule],
    exports: [UserComponent],
    providers: [UserService],
    entryComponents: [UserModalComponent]

})

export class UserModule {
}
