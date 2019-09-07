import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Helper } from './helper.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SnackBarService } from './snack-bar.service';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    SnackBarService,
    Helper
  ]
})
export class CoreModule {
  /**
   * CoreModule constructor
   *
   * @param parentModule
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
