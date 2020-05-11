import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationModule } from './configuration/configuration.modules';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { UIModule } from './ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatInputModule } from '@angular/material/input';
import { FormlyFieldTypeahead } from './shared/types/typeahead.type.component';


@NgModule({
  declarations: [
    AppComponent,
    FormlyFieldTypeahead
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ConfigurationModule,
    SharedModule,
    AdminModule,
    UIModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormlyBootstrapModule,
    MatInputModule,
    FormlyModule.forRoot({
      types: [
        { name: 'typeahead', component: FormlyFieldTypeahead }],
      validationMessages: [        
        { name: 'required', message: 'Este campo es requerido' },
      ]
    }),
  ],
  schemas: [  ],  
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
