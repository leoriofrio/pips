import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProformAddComponent } from './proform-add/proform-add.component';
import { UIRoutingModule } from './ui-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteTypeComponent } from  './proform-add/autocomplete-type.component';


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
    MatAutocompleteModule,
    FormlyModule.forRoot({
      types: [{
        name: 'autocomplete',
        component: AutocompleteTypeComponent,
        wrappers: ['form-field'],
      }],
      validationMessages: [        
        { name: 'required', message: 'This field is required' },
      ],
    }),
    MatNativeDateModule    
  ],
  declarations: [ProformAddComponent, AutocompleteTypeComponent],
  providers: [],
  exports: [ProformAddComponent]
})
export class UIModule {}