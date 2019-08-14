import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
    { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
    { path: 'homeActors', loadChildren: './modules/home-actors/home-actors.module#HomeActorsModule' },
    { path: 'homeAdministration', loadChildren: './modules/home-administration/home-administration.module#HomeAdministrationModule' },
    { path: 'homeSuperAdmin', loadChildren: './modules/home-super-admin/home-super-admin.module#HomeSuperAdminModule' },
    { path: 'educationalinstitution', loadChildren: './modules/educational-institution/educational-institution.module#EducationalInstitutionModule' },
    { path: 'level', loadChildren: './modules/level/level.module#LevelModule' },
    { path: 'error500', loadChildren: './modules/errors/error500/error500.module#Error500Module' },



];
