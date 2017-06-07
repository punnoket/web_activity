import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './router';



import { LoginService } from './login.service';
import { GetAcService } from './getactivity.service';
import { AddActivityService } from './add_activity.service';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VoteComponent } from './vote/vote.component';
import { AddActComponent } from './add-act/add-act.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    VoteComponent,
    AddActComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [LoginService, GetAcService, AddActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
