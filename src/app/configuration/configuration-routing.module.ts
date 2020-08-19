import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {USER_ROLES} from '../app.keys';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';
import { UserComponent } from './user/user.component';
import { CollegesComponent } from './colleges/colleges.component';
import { CampaignComponent } from './campaign/campaign.component';
import { PriceComponent } from './price/price.component';

const configurationRoutes: Routes = [
  { path: 'product', component: ProductComponent  },
  { path: 'client', component: ClientComponent  },
  { path: 'user', component: UserComponent},
  { path: 'college', component: CollegesComponent},
  { path: 'campaign', component: CampaignComponent},
  { path: 'price', component: PriceComponent}
];
@NgModule({
  imports: [RouterModule.forChild(configurationRoutes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
