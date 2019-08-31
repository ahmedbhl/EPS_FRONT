import { NgModule } from '@angular/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library/library.component';
import { LibraryService } from './services/library.service';

@NgModule({
    declarations: [LibraryComponent],
    imports: [LibraryRoutingModule, SharedModuleModule],
    exports: [LibraryComponent],
    providers: [LibraryService],

})

export class LibraryModule {
}
