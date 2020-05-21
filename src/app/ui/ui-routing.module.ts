import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ProformAddComponent } from './proform-add/proform-add.component';
import {USER_ROLES} from '../app.keys';
import { ProformListComponent } from './proform-list/proform-list.component';

const configurationRoutes: Routes = [
  { path: 'proform', component: ProformAddComponent },
  { path: 'proform-list', component: ProformListComponent }
];
@NgModule({
  imports: [RouterModule.forChild(configurationRoutes)],
  exports: [RouterModule]
})
export class UIRoutingModule {}