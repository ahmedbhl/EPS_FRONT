import { Routes } from '@angular/router';

export const routes: Routes = [
    //  { path: 'login', loadChildren: 'app/main/login/login.module#LoginModule' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './modules/home/home.module#HomeModule' }
];
