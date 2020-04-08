import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { RoutesKeys } from './app.keys';
import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './admin/home/home.component';



const routes: Routes = [  
  {path: 'Home', component: HomeComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{provide: APP_BASE_HREF, useValue: '/' + (window.location.pathname.split('/')[1] || '')}],
  exports: [RouterModule]
})
export class AppRoutingModule { }
