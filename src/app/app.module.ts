import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationModule } from './configuration/configuration.modules';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { UIModule } from './ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UploadDirective } from './directives/upload.directive';
import { FormlyFieldNgbDatePicker } from './shared/components/form/ngb-date-picker.type.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ConfigurationModule,
    SharedModule,
    AdminModule,
    UIModule,
    NgSelectModule,
    FormlyBootstrapModule,
    MatInputModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        {name: 'ngb-date-picker', component: FormlyFieldNgbDatePicker},
        ],
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
