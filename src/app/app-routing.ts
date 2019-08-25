import { Routes } from '@angular/router';

export const routes: Routes = [
    // tslint:disable: max-line-length
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
    { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
    { path: 'homeActors', loadChildren: './modules/home-actors/home-actors.module#HomeActorsModule' },
    { path: 'homeAdministration', loadChildren: './modules/home-administration/home-administration.module#HomeAdministrationModule' },
    { path: 'homeSuperAdmin', loadChildren: './modules/home-super-admin/home-super-admin.module#HomeSuperAdminModule' },
    { path: 'educationalinstitution', loadChildren: './modules/educational-institution/educational-institution.module#EducationalInstitutionModule' },
    { path: 'level', loadChildren: './modules/level/level.module#LevelModule' },
    { path: 'field', loadChildren: './modules/field/field.module#FieldModule' },
    { path: 'classe', loadChildren: './modules/classe/classe.module#ClasseModule' },
    { path: 'course', loadChildren: './modules/course/course.module#CourseModule' },
    { path: 'signup', loadChildren: './modules/signup/signup.module#SignupModule' },
    { path: 'reset', loadChildren: './modules/forgot-password/forgot-password.module#ForgotPasswordModule' },
    { path: 'user', loadChildren: './modules/user/user.module#UserModule' },

    { path: 'error500', loadChildren: './modules/errors/error500/error500.module#Error500Module' },

];
