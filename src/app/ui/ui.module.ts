import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProformAddComponent } from './proform-add/proform-add.component';
import { UIRoutingModule } from './ui-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatInputModule } from '@angular/material/input';
import { ProformListComponent } from './proform-list/proform-list.component';
import { ProformEditComponent } from './proform-edit/proform-edit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UIRoutingModule,
    AppRoutingModule,
    FormlyBootstrapModule,
    MatInputModule,
    FormlyModule.forRoot({
      types: [],
      validationMessages: [        
        { name: 'required', message: 'This field is required' },
      ]
    }),
        
  ],
  declarations: [ProformAddComponent, ProformListComponent, ProformEditComponent],
  providers: [],
  exports: [ProformAddComponent]
})
export class UIModule {}