import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeActorsModule } from './modules/home-actors/home-actors.module';
import { HomeModule } from './modules/home/home.module';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';
import { SharedModuleModule } from './shared/shared-module/shared-module.module';
import { LoginModule } from './modules/login/login.module';
import { BasicAuthInterceptor } from './shared/helpers';
import { HomeAdministrationComponent } from './modules/home-administration/home-administration.component';

@NgModule({
  declarations: [
    AppComponent, FooterComponent, HeaderComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LoginModule,
    HomeModule,
    HomeActorsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModuleModule.forRoot(),
    FlexLayoutModule,
    NgxPermissionsModule.forRoot(),
  ],
  exports: [],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
