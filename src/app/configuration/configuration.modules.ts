'use strict';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';
import { UserComponent } from './user/user.component';
import { CollegesComponent } from './colleges/colleges.component';
import { CampaignComponent } from './campaign/campaign.component';
import { KitComponent } from './kit/kit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    ConfigurationRoutingModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    ProductComponent, 
    ClientComponent, 
    UserComponent, 
    CollegesComponent,
    CampaignComponent,
    KitComponent
  ],
  providers: [],
  exports: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ConfigurationModule {}
