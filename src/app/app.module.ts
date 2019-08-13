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
import { HomeSuperAdminComponent } from './modules/home-super-admin/home-super-admin.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { EducationalInstitutionComponent } from './modules/educational-institution/educational-institution.component';
import { EducationalInstitutionModule } from './modules/educational-institution/educational-institution.module';
import { Error500Component } from './modules/errors/error500/error500.component';
import { Error500Module } from './modules/errors/error500/error500.module';

@NgModule({
  declarations: [
    AppComponent, FooterComponent, HeaderComponent, SideNavComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LoginModule,
    HomeModule,
    HomeActorsModule,
    EducationalInstitutionModule,
    Error500Module,
    ReactiveFormsModule,
    FormsModule,
    SharedModuleModule.forRoot(),
    FlexLayoutModule,
    NgxPermissionsModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
