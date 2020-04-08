import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ProductComponent } from './product/product.component';
import {USER_ROLES} from '../app.keys';

const configurationRoutes: Routes = [
  {
    path: 'product',
    component: ProductComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(configurationRoutes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
