import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VoteComponent } from './vote/vote.component';

import { AppComponent } from './app.component';
import { AddActComponent } from './add-act/add-act.component';
import { ModuleWithProviders } from '@angular/core';


export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'add-act', component: AddActComponent},
    { path: 'login', component: LoginComponent}
  
];


export const routes: ModuleWithProviders = RouterModule.forRoot(router);

export class AppRoutingModule { }
