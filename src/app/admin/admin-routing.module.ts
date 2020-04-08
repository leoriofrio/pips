import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import {USER_ROLES} from '../app.keys';

const configurationRoutes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'menu', component: MenuComponent }
];
@NgModule({
  imports: [RouterModule.forChild(configurationRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}