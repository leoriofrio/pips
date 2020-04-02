import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './iu/login/login.component';
import { MenuComponent } from './iu/menu/menu.component';
import { AgGridModule } from 'ag-grid-angular';
import { ProjectComponent } from './shared/components/project/project.component';
import { ProductComponent } from './configuration/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    ProjectComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
