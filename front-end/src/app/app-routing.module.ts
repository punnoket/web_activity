import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VoteComponent } from './vote/vote.component';
import { AddActivityComponent } from './add-activity/add-activity.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [

      { path: 'add_activity', component: AddActivityComponent },

    ]
  },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
