import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
    { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
    { path: 'homeActors', loadChildren: './modules/home-actors/home-actors.module#HomeActorsModule' }
];
