import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ProformAddComponent } from './proform-add/proform-add.component';
import {USER_ROLES} from '../app.keys';
import { ProformListComponent } from './proform-list/proform-list.component';
import { ProformEditComponent } from './proform-edit/proform-edit.component';
import { ProformStateComponent } from './proform-state/proform-state.component';
import { ProformCheckComponent } from './proform-check/proform-check.component';

const configurationRoutes: Routes = [
  { path: 'proform', component: ProformAddComponent },
  { path: 'proform-list', component: ProformListComponent },
  { path: 'proform-state', component:  ProformStateComponent},
  { path: 'proform-edit/:id', component: ProformEditComponent },
  { path: 'proform-check/:id', component: ProformCheckComponent }
];
@NgModule({
  imports: [RouterModule.forChild(configurationRoutes)],
  exports: [RouterModule]
})
export class UIRoutingModule {}