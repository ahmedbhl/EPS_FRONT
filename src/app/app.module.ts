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
import { CourseModule } from './modules/course/course.module';
import { EducationalInstitutionModule } from './modules/educational-institution/educational-institution.module';
import { Error500Module } from './modules/errors/error500/error500.module';
import { FieldModule } from './modules/field/field.module';
import { ForgotPasswordModule } from './modules/forgot-password/forgot-password.module';
import { GroupModule } from './modules/group/group.module';
import { HomeActorsModule } from './modules/home-actors/home-actors.module';
import { HomeModule } from './modules/home/home.module';
import { LevelModule } from './modules/level/level.module';
import { LibraryModule } from './modules/library/library.module';
import { LoginModule } from './modules/login/login.module';
import { MessengerModule } from './modules/messenger/messenger.module';
import { SignupModule } from './modules/signup/signup.module';
import { UserModule } from './modules/user/user.module';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BasicAuthInterceptor } from './shared/helpers';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';
import { CommentService } from './shared/services/comment.service';
import { LikeService } from './shared/services/like.service';
import { PostService } from './shared/services/post.service';
import { SharedModuleModule } from './shared/shared-module/shared-module.module';
import { SideNavComponent } from './shared/side-nav/side-nav.component';

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
    SignupModule,
    ForgotPasswordModule,
    UserModule,
    LibraryModule,
    MessengerModule,
    GroupModule,
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
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, PostService, LikeService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
