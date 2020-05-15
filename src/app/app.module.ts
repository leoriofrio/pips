import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationModule } from './configuration/configuration.modules';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { UIModule } from './ui/ui.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UploadDirective } from './directives/upload.directive';

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
    FormlyModule.forRoot({
      types: [
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
