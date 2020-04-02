import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesKeys } from './app.keys';
import { LoginComponent } from './iu/login/login.component';
import { ProformAddComponent } from './proform/proform-add/proform-add.component';
import { ProductComponent } from './configuration/product/product.component';


const routes: Routes = [  
  {path: 'proform', component: ProformAddComponent},
  {path: 'product', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
