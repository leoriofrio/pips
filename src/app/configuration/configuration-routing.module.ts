import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {USER_ROLES} from '../app.keys';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';

const configurationRoutes: Routes = [
  { path: 'product', component: ProductComponent  },
  { path: 'client', component: ClientComponent  }
];
@NgModule({
  imports: [RouterModule.forChild(configurationRoutes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
