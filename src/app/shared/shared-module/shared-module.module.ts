import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MaterialModule } from '../material-module/material-module.module';
import { FileNamePipePipe } from '../pipe/file-name-pipe.pipe';

@NgModule({
  declarations: [FileNamePipePipe],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    PickerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [CommonModule, MaterialModule,
    HttpClientModule, FlexLayoutModule, PickerModule, ReactiveFormsModule, FormsModule, FileNamePipePipe]
})
export class SharedModuleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModuleModule,
      providers: []
    };
  }
}
