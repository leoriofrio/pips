import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ProformAddComponent } from './proform-add/proform-add.component';
import {USER_ROLES} from '../app.keys';

const configurationRoutes: Routes = [
  { path: 'proform', component: ProformAddComponent }
];
@NgModule({
  imports: [RouterModule.forChild(configurationRoutes)],
  exports: [RouterModule]
})
export class UIRoutingModule {}