import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProformAddComponent } from './proform-add/proform-add.component';
import { UIRoutingModule } from './ui-routing.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIRoutingModule,
    AppRoutingModule
  ],
  declarations: [ProformAddComponent],
  providers: [],
  exports: []
})
export class UIModule {}