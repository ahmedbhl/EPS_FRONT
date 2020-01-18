import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { MessengerRoutingModule } from './messenger-routing.module';
import { MessengerComponent } from './messenger.component';
import { MessengerSocketService } from './service/messenger-socket.service';

@NgModule({
    declarations: [MessengerComponent],
    imports: [MessengerRoutingModule, SharedModuleModule],
    exports: [MessengerComponent],
    providers: [MessengerSocketService]
})

export class MessengerModule {
}
