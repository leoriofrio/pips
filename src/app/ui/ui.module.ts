import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProformAddComponent } from './proform-add/proform-add.component';
import { UIRoutingModule } from './ui-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIRoutingModule,
    AppRoutingModule,
    FormlyMaterialModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
  ],
  declarations: [ProformAddComponent],
  providers: [],
  exports: [ProformAddComponent]
})
export class UIModule {}