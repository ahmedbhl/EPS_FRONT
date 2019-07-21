import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material-module/material-module.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PickerModule } from '@ctrl/ngx-emoji-mart'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule, 
    HttpClientModule,
    FlexLayoutModule,
    PickerModule
  ],
  exports: [CommonModule, MaterialModule, HttpClientModule,FlexLayoutModule,PickerModule]
})
export class SharedModuleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModuleModule,
      providers: []
    };
  }
}
