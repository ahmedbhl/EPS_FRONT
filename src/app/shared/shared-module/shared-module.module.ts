import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material-module/material-module.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PickerModule } from '@ctrl/ngx-emoji-mart'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    PickerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [CommonModule, MaterialModule, HttpClientModule, FlexLayoutModule, PickerModule, ReactiveFormsModule, FormsModule]
})
export class SharedModuleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModuleModule,
      providers: []
    };
  }
}
