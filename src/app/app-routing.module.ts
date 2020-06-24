import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { RoutesKeys } from './app.keys';
import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './admin/home/home.component';
import { DataImportComponent } from './shared/components/data-import/data-import.component';
import { HotableComponent } from './shared/components/hotable/hotable.component';


const routes: Routes = [  
  {path: 'Home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'dataimport', component: DataImportComponent},
  {path: 'hotable', component: HotableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
