import { LayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ClasseModule } from './modules/classe/classe.module';
import { EducationalInstitutionModule } from './modules/educational-institution/educational-institution.module';
import { Error500Module } from './modules/errors/error500/error500.module';
import { FieldModule } from './modules/field/field.module';
import { HomeActorsModule } from './modules/home-actors/home-actors.module';
import { HomeModule } from './modules/home/home.module';
import { LevelModule } from './modules/level/level.module';
import { LoginModule } from './modules/login/login.module';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BasicAuthInterceptor } from './shared/helpers';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';
import { SharedModuleModule } from './shared/shared-module/shared-module.module';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { CourseModule } from './modules/course/course.module';

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
    LevelModule,
    FieldModule,
    ClasseModule,
    CourseModule,
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
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
